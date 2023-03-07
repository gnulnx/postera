from elasticsearch import Elasticsearch
import json
import os
from .utils import jprint, terms_to_smiles, est_lead_time

docker = os.environ.get("DOCKER")

if docker:
    es = Elasticsearch("http://es:9200")
else:
    es = Elasticsearch("http://localhost:9200")

import rdkit.Chem as Chem


def typeahead_search(q: str):
    """
    Perform an intelligent fuzzy typeahead search
    3 parts.
    1. Preprocess query terms into 3 categories
      - terms that we will use do fuzzy autocomplete on
      - terms that we will do exact matches on.
      - Terms used to postprocess results based on vendor
    2. Elastic Search Query
    3. Post Processing Results

    """

    # 1) Preprocess query terms.
    terms = q.split()

    # Negated vendor list used in postprocessing
    negated_vendors = [term for term in terms if term.startswith("-")]
    
    # For this simple app exact matches are any smiles string detected in the input
    exact_match_terms = terms_to_smiles(terms)

    # Remove negated vendors and exact match terms to leave list of fuzzy autocomplete terms 
    multi_match_terms = set(terms) - set(negated_vendors + exact_match_terms)

    # Now remove the leading '-' from negated vendors for easier matching later
    negated_vendors = [vendor[1:] for vendor in negated_vendors]
    
    # 2) Build up ES queries and fetch results from ES
    multi_match_query = [{
        "multi_match": {
            "query": term,
            "fields": [
                "molecules.catalog_entries.catalog_name",
                "reactions.name",
            ],
            "fuzziness" : "AUTO",
            "prefix_length" : 3,
            "_name": "matched_field"
        }
    } for term in multi_match_terms] 
    

    # Build exact match queries for bbs matching smiles
    exact_match_query = [{
        "term": {
            "reactions.sources.keyword": {
                "value": term
            }
        }
    } for term in exact_match_terms]
    
    query = {
        "bool": {
            "must": multi_match_query + exact_match_query,
        }
    }
    highlight = {
        "fields" : {
            "molecules.catalog_entries.catalog_name": {},
            "reactions.name" : {},
            "reactions.sources.keyword": {}
        }
    }
    jprint(query)

    resp = es.search(index="routes", query=query, highlight=highlight, source=["molecules", "reactions"], size=100)

    # 3) Post process the results
    results = []
    for route in resp["hits"]["hits"]:
        molecules = route["_source"]["molecules"]
        reactions = route["_source"]["reactions"]

        # Build a list of building blocks from the molecules section
        bbs = [mol for mol in  molecules if mol["is_building_block"] is True]

        # Remove negated vendors from building block catalog_entries
        for bb in bbs:
            bb["catalog_entries"] = [entry for entry in bb["catalog_entries"] if entry["catalog_name"] not in negated_vendors]

        # Check if the user is trying to filter based on vender name from the highlights.
        # If so create a list of preferred_vendors
        vendor_highlights = route.get("highlight", {}).get("molecules.catalog_entries.catalog_name", [])
        preferred_vendors = {v.replace("<em>","").replace("</em>", "") for v in vendor_highlights}

        vendors_for_all_bb = True
        if preferred_vendors:
            for mol in bbs:
                mol["catalog_entries"] = [entry for entry in mol['catalog_entries'] if entry["catalog_name"] in preferred_vendors]
                if not mol["catalog_entries"]:
                    vendors_for_all_bb = False
                    break
            
        if vendors_for_all_bb:
            results.append({
                "score": route["_score"],
                "id": route["_id"],
                "rxn_name": [rxn["name"] for rxn in reactions],
                "building_blocks":  bbs,
                "est_lead_time": est_lead_time(bbs)
            })

    return results


def fetch_reaction(id):
    """
    Fetch a single route from the database by the elasticsearchid
    """
    query = {
        "terms": {
            "_id": [id]
        }
    }
    resp = es.search(index="routes", query=query, source=["reactions"], size=1)
    return resp

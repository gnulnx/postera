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
    """

    terms = q.split()

    # Check for negated vedors
    negated_vendors = [term for term in terms if term.startswith("-")]
    
    # Check our list of terms for smiles strings.
    smiles = terms_to_smiles(terms)

    # Remove all smiles strings and negated_vendors from our terms
    for term in smiles + negated_vendors:
        terms.remove(term)

    # Now remove the leading '-' from negated vendors for easier matching later
    negated_vendors = [vendor[1:] for vendor in negated_vendors]
    
    # Build fuzzy autocomplete queries for text terms
    text_queries = [{
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
    } for term in terms] 
    

    # Build exact match queries for bbs matching smiles
    bb_queries = [{
        "term": {
            "reactions.sources.keyword": {
                "value": mol
            }
        }
    } for mol in smiles]
    
    query = {
        "bool": {
            "must": text_queries + bb_queries,
        }
    }
    highlight = {
        "fields" : {
            "molecules.catalog_entries.catalog_name": {},
            "reactions.name" : {},
            "reactions.sources.keyword": {}
        }
    }

    resp = es.search(index="routes", query=query, highlight=highlight, source=["molecules", "reactions"], size=100)

    results = []
    for route in resp["hits"]["hits"]:

        # Build a list of building blocks from the molecules section
        building_blocks = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is True]

        # Remove all the negated vendors from the building_blocks
        for bb in building_blocks:
            bb["catalog_entries"] = [entry for entry in bb["catalog_entries"] if entry["catalog_name"] not in negated_vendors]

        # Check if the user is trying to filter based on vender name from the highlights.
        vendor_highlights = route.get("highlight", {}).get("molecules.catalog_entries.catalog_name")

        found_vendors_for_all_bb = True
        if vendor_highlights:
            # Create a set of preferred vendors from the search results
            preferred_vendors = {v.replace("<em>","").replace("</em>", "") for v in vendor_highlights}

            for mol in building_blocks:
                mol["catalog_entries"] = [entry for entry in mol['catalog_entries'] if entry["catalog_name"] in preferred_vendors]
                if not mol["catalog_entries"]:
                    found_vendors_for_all_bb = False
                    break
            
        if found_vendors_for_all_bb:
            results.append({
                "score": route["_score"],
                "id": route["_id"],
                "rxn_name": [rxn["name"] for rxn in route["_source"]["reactions"]],
                "building_blocks":  building_blocks,
                "est_lead_time": est_lead_time(building_blocks)
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

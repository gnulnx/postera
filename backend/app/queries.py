from elasticsearch import Elasticsearch
import json
import os

docker = os.environ.get("DOCKER")

if docker:
    es = Elasticsearch("http://es:9200")
else:
    es = Elasticsearch("http://localhost:9200")


# utility function for pretty printing json/dicts
def jprint(s):
    print(json.dumps(s, indent=4))


def typeahead_search(q):
    query = {
        "bool": {
            "must": [
                {
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
                }
                for term in q.split()
            ]
        }
    }
    highlight = {
        "fields" : {
            "molecules.catalog_entries.catalog_name": {},
            "reactions.name" : {},
        }
    }

    resp = es.search(index="routes", query=query, highlight=highlight, source=["molecules", "reactions"], size=100)

    results = []
    for route in resp["hits"]["hits"]:

        # Build a list of building blocks from the molecules section
        building_blocks = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is True]

        # Check if the user is trying to filter based on vender name from the highlights.
        vendor_highlights = route.get("highlight").get("molecules.catalog_entries.catalog_name")

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
                "building_blocks":  building_blocks
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

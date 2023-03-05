from elasticsearch import Elasticsearch
import json

# TODO move this somewhere else....
es = Elasticsearch("http://localhost:9200")

def jprint(s):
    print(json.dumps(s, indent=4))

def fetch_results(q):
    query = {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "query": term,
                        "fields": [
                            # "molecules.smiles",
                            "molecules.catalog_entries.catalog_name",
                            "reactions.name",
                            # "reactions.target",
                            # "reactions.sources",
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
            # "molecules.smiles": {},
            "molecules.catalog_entries.catalog_name": {},
            "reactions.name" : {},
            # "reactions.target": {},
            # "reactions.sources": {}
        }
    }

    resp = es.search(index="routes", query=query, highlight=highlight, source=["molecules", "reactions"], size=100)

    results = []
    for route in resp["hits"]["hits"]:
        
        # products = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is False]
        building_blocks = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is True]
        # Check if the user is trying to filter based on vender name from the highlights.
        vendor_highlights = route["highlight"].get("molecules.catalog_entries.catalog_name")            

        filtered_bbs = []
        if vendor_highlights:
            # Create a set of selected vendors from the 
            vendors = {v.replace("<em>","").replace("</em>", "") for v in vendor_highlights}

            for mol in building_blocks:
                new_mol = {
                    "smiles": mol["smiles"],
                    "catalog_entries": []
                }
                for entry in mol["catalog_entries"]:
                    if entry["catalog_name"] in vendors:
                        new_mol["catalog_entries"].append(entry)

                # If we matched a building block in our catagory then keep it
                if new_mol["catalog_entries"]:
                    filtered_bbs.append(new_mol)

            result = {
                "score": route["_score"],
                "id": route["_id"],
                "rxn_name": [rxn["name"] for rxn in route["_source"]["reactions"]],
                "building_blocks": filtered_bbs if filtered_bbs else building_blocks
            }
            if len(building_blocks) == len(filtered_bbs):
                results.append(result)
        else:
            results.append({
            "score": route["_score"],
            "id": route["_id"],
            "rxn_name": [rxn["name"] for rxn in route["_source"]["reactions"]],
            "building_blocks":  building_blocks
        })


    print("returning %s" % len(results))
    return results
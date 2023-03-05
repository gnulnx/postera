import json
def jprint(s):
    print(json.dumps(s, indent=4))

def process_results(resp):
    results = []
    for route in resp["hits"]["hits"]:
        
        # products = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is False]
        building_blocks = [mol for mol in route["_source"]["molecules"] if mol["is_building_block"] is True]
        highlights = route["highlight"]

        result = {
            "score": route["_score"],
            "id": route["_id"],
            "rxn_name": [rxn["name"] for rxn in route["_source"]["reactions"]],
            "building_blocks": building_blocks
        }

        # Check if the user is trying to filter based on vender name from the highlights.
        vendor_highlights = highlights.get("molecules.catalog_entries.catalog_name")
        vendors = [v.replace("<em>","").replace("</em>", "") for v in vendor_highlights]

        filtered_bbs = []
        for mol in building_blocks:
            new_mol = {
                "smilles": mol["smiles"],
                "catalog_entries": []
            }
            for entry in mol["catalog_entries"]:
                if entry["catalog_name"] in vendors:
                    new_mol["catalog_entries"].append(entry)

            # If we matched a building block in our catagory then keep it
            if new_mol["catalog_entries"]:
                filtered_bbs.append(new_mol)
        
        jprint(building_blocks)
        print("building_blocks")
        jprint(filtered_bbs)
        print("filtered_bbs")

        if len(building_blocks) != len(filtered_bbs):
            print("Not keeping this result")
            input()

        jprint(vendors)
        if not vendors:
            results.append(result)
        elif len(vendors) == len(building_blocks):
            print("Limiting search results to vendor")
            results.append(result)

    print("returning %s" % len(results))
    return results
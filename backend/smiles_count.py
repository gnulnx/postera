#!/usr/bin/env python

import json
# from elasticsearch import Elasticsearch
# es = Elasticsearch("http://localhost:9200")

def jprint(s):
    print(json.dumps(s, indent=4))


# Read in routes
with open("app/routes.json") as f:
    routes = json.load(f)

products = {}
bblks = {}
for route in routes:
    for mol in route.get("molecules"):
        smiles = mol["smiles"]
        is_building_block = mol.get("is_building_block")
        # jprint(mol)
        if is_building_block:
            if smiles not in bblks:
                bblks[smiles] = 0

            bblks[smiles] += 1
        else:
            if smiles not in products:
                products[smiles] = 0

            products[smiles] += 1
        

jprint(products)
jprint(bblks)
# injest routes into es
# for doc in routes:
#     resp = es.index(index="routes", document=doc)

# print(f"total docs ingested: {len(routes)}")
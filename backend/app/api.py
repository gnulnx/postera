from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import rdkit.Chem as Chem
import rdkit.Chem.Draw

import json
from elasticsearch import Elasticsearch

# TODO move this somewhere else....
es = Elasticsearch("http://localhost:9200")

app = FastAPI()

#Allow CORS from frontend app on port 8001
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=[
        "http://localhost:8001",
        "http://localhost:3000", # SHould be able to remove this later
        "http://localhost:8000"
    ],
    allow_headers=["Access-Control-Allow-Origin"]
)


def make_routes():
    # TODO: use this method to return routes as a tree data structure.
    # routes are found in the routes.json file
    return [{}]

def draw_molecule(smiles: str):
    mol = Chem.MolFromSmiles(smiles)
    img = Chem.Draw.MolsToGridImage([mol], molsPerRow=1, useSVG=True)
    return img

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {
        "message": "Welcome to your app.",
    }

@app.get("/molecule", tags=["molecule"])
async def get_molecule(smiles: str) -> dict:
    molecule = draw_molecule(smiles)

    # TODO: return svg image
    return {
        "data": molecule,
    }

@app.get("/routes", tags=["routes"])
async def get_routes(q: str) -> dict:
    # "Amidation molport O=C(O)Cn1nnc2ccccc21"
    # A Basic ES query to get searchable routes quickly.
    # May need field boosting for better peformance
    query = {
        "multi_match": {
            "query": q,
            "fields": [
                "molecules.catalog_entries.catalog_name",
                "reactions.name",
                "reactions.target",
                "reactions.sources"
            ]
        }
    }

    terms = q.split()
    print(terms)

    blah = [{
        "multi_match": {
            "query": term,
            "fields": [
                "molecules.catalog_entries.catalog_name",
                "reactions.name",
                "reactions.target",
                "reactions.sources"
            ]
        }
    }
    for term in q.split()]

    print(blah)

    query = {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "query": q,
                        "fields": [
                            "molecules.catalog_entries.catalog_name",
                            "reactions.name",
                            "reactions.target",
                            "reactions.sources"
                        ],
                        "fuzziness" : "AUTO",
                        "prefix_length" : 2
                    }
                }
            ]
        }
    }

    query = {
        "bool": {
            "must": [
                {
                    "multi_match": {
                        "query": term,
                        "fields": [
                            "molecules.catalog_entries.catalog_name",
                            "reactions.name",
                            "reactions.target",
                            "reactions.sources",
                        ],
                        "fuzziness" : "AUTO",
                        "prefix_length" : 2,
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
            "reactions.target": {},
            "reactions.sources": {}
        }
    }

    print(json.dumps(query, indent=4))

    resp = es.search(index="routes", query=query, highlight=highlight)
    print(resp.keys())
    
    # for doc in resp["hits"]["hits"]:
    #     print(doc)

    print(json.dumps(resp["hits"]["hits"], indent=4))

    total_results = resp['hits']['total']['value']
    print(f"Total hits {total_results}")
    routes = make_routes()

    """
     /*
  "reactions": [
            {
                "name": "Amidation",
                "target": "O=C(Cn1nnc2ccccc21)NCc1ccsc1",
                "sources": [
                    "NCc1ccsc1",
                    "O=C(O)Cn1nnc2ccccc21"
                ],
                "smartsTemplate": "[C:2](=[O:3])[N;!$(N(C=O)(C=O)):1]>>([N:1][#1].[C:2](=[O:3])[O][#1])"
            },
            {
                "name": "Iodo N-arylation",
                "target": "O=C(Cn1nnc2ccccc21)N(Cc1ccsc1)c1ccc(Cl)cc1",
                "sources": [
                    "Clc1ccc(I)cc1",
                    "O=C(Cn1nnc2ccccc21)NCc1ccsc1"
                ],
                "smartsTemplate": "[c:1]-;!@[$(n),$([N][C]=[O]):2]>>([*:1][I].[*:2][#1])"
            }
        ],
  */
    """

    reactions = {
        "name": 'O=C(Cn1nnc2ccccc21)N(Cc1ccsc1)c1ccc(Cl)cc1',
        "attributes": {
        "reaction": "Amidation"
        },
        "children": [
        {
            "name": 'Clc1ccc(I)cc1"',
            "attributes": {
            "reaction": 'Iodo N-arylation',
            }
        },
        {
            "name": 'O=C(Cn1nnc2ccccc21)NCc1ccsc1',
            "children": [
            {
                "name": 'NCc1ccsc1',
            },
            {
                "name": "O=C(O)Cn1nnc2ccccc21"
            }
            ]
        },
        ],
    }
    return {
        "data": reactions,
    }

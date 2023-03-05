from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import rdkit.Chem as Chem
import rdkit.Chem.Draw

import json
from .queries import fetch_results
from .utils import process_results
from elasticsearch import Elasticsearch

# TODO move this somewhere else....
es = Elasticsearch("http://localhost:9200")

app = FastAPI()

def jprint(s):
    print(json.dumps(s, indent=4))

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


def process_route(route):
    """
        Given a synthetic route described as such

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

        Convert to a D3 suitable graph in the form

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
    """
    route = route["_source"]
    # products = [mol for mol in route["molecules"] if mol["is_building_block"] is False]
    # building_blocks = [mol for mol in route["molecules"] if mol["is_building_block"] is True]

    routes = []
    rxn_map = {}
    for product in route["reactions"]:
        children = []
        for s in product["sources"]:
            if s in rxn_map:
                children.append({
                    "name": s,
                    "attributes": rxn_map[s]["attributes"],
                    "children": rxn_map[s]["children"]
                })
            else:
                children.append({"name": s})

        rxn_tree = {
            "name": product["target"],
            "attributes": {"reaction": product["name"]},
            "children": children
        }


        rxn_map[product["target"]] = rxn_tree
        routes.append(rxn_tree)

    return rxn_tree

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
    return {
        "data": molecule,
    }

@app.get("/fetch_route", tags=["fetch_route"])
async def fetch_route(id: str) -> dict:
    print("Fetching roughte; %s" % id)
    query = {
        "terms": {
            "_id": [id]
        }
    }
    resp = es.search(index="routes", query=query)
    total_results = resp['hits']['total']['value']
    print("total results: %s" % total_results)
    if not total_results:
        raise HTTPException(status_code=404, detail="Route Not Found")
    
    rxn_tree = process_route(resp['hits']['hits'][0])

    return {
        "data": rxn_tree,
    }

@app.get("/search", tags=["search"])
async def search(q: str) -> dict:
    result = fetch_results(q)
    # jprint(resp)
    # results = process_results(resp)
    return result
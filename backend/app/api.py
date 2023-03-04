from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import rdkit.Chem as Chem
import rdkit.Chem.Draw

app = FastAPI()

#Allow CORS from frontend app on port 8001
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=["http://localhost:8001", "http://localhost:3000"],
    allow_headers=["Access-Control-Allow-Origin"]
)

# origins = [
#     "http://localhost:3000",
#     "localhost:3000"
# ]
# If using VSCode + windows, try using your IP 
# instead (see frontent terminal)
#origins = [
#    "http://X.X.X.X:3000",
#    "X.X.X.X:3000"
#]


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )


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
async def get_routes() -> dict:

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

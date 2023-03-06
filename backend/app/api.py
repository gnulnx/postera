from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .queries import typeahead_search, fetch_reaction
from .utils import process_route, draw_molecule

app = FastAPI()


#Allow CORS from frontend app on port 8001
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_origins=[
        "http://localhost:8000",
    ],
    allow_headers=["Access-Control-Allow-Origin"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    """
    Think we can remove this one.
    """
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
    """
    Given the ES id fetch the reaction from ES and then process the route to return
    the rxn_tree for D3 rendering.
    """
    resp = fetch_reaction(id)
    total_results = resp['hits']['total']['value']
    if not total_results:
        raise HTTPException(status_code=404, detail="Route Not Found")
    
    rxn_tree = process_route(resp['hits']['hits'][0])

    return {
        "data": rxn_tree,
    }


@app.get("/search", tags=["search"])
async def search(q: str) -> dict:
    """
    API to perform fuzzy typeahead searching against reactions name and vender names.
    Also provides the ability to negate vendors for example "-molprint"
    In addition it will perform exact matches on any supplied smiles strings.
    """
    result = typeahead_search(q)
    return result
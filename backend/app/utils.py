import rdkit.Chem as Chem
import rdkit.Chem.Draw
import json

def jprint(s):
    """
    Simple utility method to pretty print dictionaries
    """
    print(json.dumps(s, indent=4))

def terms_to_smiles(terms):
    smiles = []
    for term in terms:
        mol = Chem.MolFromSmiles(term)
        if mol:
            smiles.append(term)
    return smiles

def draw_molecule(smiles: str):
    mol = Chem.MolFromSmiles(smiles)
    img = Chem.Draw.MolsToGridImage([mol], molsPerRow=1, useSVG=True)
    return img

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

def est_lead_time(bbs):
    """
    In order to find the estimated lead time we first need to find the MIN lead time
    for each building block based on the list of selected vendors.
    
    The estimated lead time is then the MAX of BB lead times.
    """
    lead_times = [{entry["catalog_name"]: entry["lead_time_weeks"]} for mol in bbs for entry in mol["catalog_entries"]]
    print("Lead_times: %s" % lead_times)

    min_lead_times = []
    for mol in bbs:
        lead_times = [e["lead_time_weeks"] for e in mol["catalog_entries"]]
        min_time = min(lead_times)
        min_lead_times.append(min(lead_times))
        min_lead_tiem = min(lead_times)
        jprint(mol)
        print(mol["smiles"], lead_times, min_time)
       
    print("estimated lead_time: %s" % max(min_lead_times))
    return max(min_lead_times)

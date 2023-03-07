import rdkit.Chem as Chem
import rdkit.Chem.Draw
import json

def jprint(s: dict):
    """
    Simple utility method to pretty print dictionaries
    """
    print(json.dumps(s, indent=4))

def terms_to_smiles(terms: list):
    """
    Given a list of terms find find all terms that are smiles strings and return that list.
    """
    smiles = [term for term in terms if Chem.MolFromSmiles(term)]
    return smiles

def draw_molecule(smiles: str):
    """
    given a smiles string return the SVG code for the moecule.
    """
    mol = Chem.MolFromSmiles(smiles)
    img = Chem.Draw.MolsToGridImage([mol], molsPerRow=1, useSVG=True)
    return img

def process_route(route: dict):
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
    route = route.get("_source")
    rxn_map = {}
    rxn_tree = {}
    
    for product in route.get("reactions"):
        sources = product.get("sources")
        children = [{
            "name": s,
            "attributes": rxn_map[s]["attributes"],
            "children": rxn_map[s]["children"]
        } if s in rxn_map else {"name": s} for s in sources]
            
        rxn_tree = {
            "name": product["target"],
            "attributes": {"reaction": product["name"]},
            "children": children
        }

        rxn_map[product["target"]] = rxn_tree

    return rxn_tree

def est_lead_time(bbs: list):
    """
    A list of minimum lead times are created, obtained from the "lead_time_weeks" attribute in mol["catalog_entries"].
    The list is generated through iteration over bbs where each molecule is accessed one by one.
    
    The estimated lead time is then the max() of BB lead times.
    """
    min_lead_times = [min([e["lead_time_weeks"] for e in mol["catalog_entries"]]) for mol in bbs]
    return max(min_lead_times)

# Backend Interview Challenge

## Overview
At PostEra, one of our core technologies is automated
[retrosynthesis](https://en.wikipedia.org/wiki/Retrosynthetic_analysis), where
we combine ML with graph algorithms to find recipes for making complex
molecules from simpler, commercially available molecules.  These recipes are
called "synthetic routes" or "routes", and there can be many such routes, with
varying starting available molecules, reactions, risk, and cost.

We are interested in finding the best one among these routes, and this
challenge involves creating a UI to help a human chemist find the best route.
When a chemist is choosing a route, they are concerned with how many steps the
route involves, how risky each individual step is, how many intermediate
compounds they can reuse across multiple compounds they are trying to
synthesize, and an long list of other factors.

For this challenge, we will be looking at real route data from our [COVID
Moonshot](https://postera.ai/covid) drug discovery campaign.

## Cheminformatics 101
Molecules are represented in code as [SMILES
strings](https://www.daylight.com/dayhtml_tutorials/languages/smiles/index.html).
Here's an example of the SMILES for
[caffeine](https://en.wikipedia.org/wiki/Caffeine):
`CN1C=NC2=C1C(=O)N(C(=O)N2C)C`.  Don't worry about understanding the format for
now.

A retrosynthesis route is a directed bipartite graph of molecule nodes (M) and
reaction nodes (R).  Edges going from a M1 node and into a R node represent
reaction pathways that produce the M1 molecule as a product, and edges going
from a R node and into a M2 node indicate that the M2 molecule is a reactant
for that reaction.  For our purposes here, a reaction can accept multiple
reactants and produces exactly 1 product.

## Server Installation
We have a simple server implementation with FastAPI backend and React frontend.
To install dependencies:
1. Install the `conda` package/environment manager from
https://docs.conda.io/projects/conda/en/latest/user-guide/install/.  This is
necessary for the rdkit dependency (pip isn't currently supported - see
https://github.com/rdkit/rdkit/issues/1812).
2. Use `conda` to create a new environment: `conda create --name postera
python=3.8`
3. Activate the environment: `conda activate postera`
4. Install the python packages:
```
conda install --file conda-packages.txt
pip --no-cache-dir install -r requirements.txt
```
5. Install javascript dependencies:
- in frontend directory, call: `npm install`

## Run server
Inside of the conda environment, call the following in two separate terminals:
1. in the backend directory: `python main.py`
2. in the frontend directory: `npm run start`

## Instructions
What we would like to see:

1. Create a nested tree representation of the route data to be called by the
`/routes` endpoint. You will need it in a format usable by the 
[react-d3-tree package](https://www.npmjs.com/package/react-d3-tree).
- You will need to use the `reactions` information in the `routes.json` file
to nest the sources by their target, where the parents are the `target` values,
and the children are the `sources` lists.
- Only display one route at a time by doing one of the following:
A. Always return all route data to the frontend, and let user select which
route to be displayed
B. Have user select which route to be displayed and then only query that route
from the backend

2. Display routes to the user with the react-d3-tree package
(demo [here](https://bkrem.github.io/react-d3-tree/)).
- Each molecule should be represented as a node, initially labeled with their
SMILES representation

3. Add images to the molecule nodes
- The `/molecule` endpoint (with some work) will serves SVG images that can be used

4. Add Search and Filter/Sort Functionality to the Backend
   1. Expose search for routes that include specific text-matched reaction names, e.g. "Amidation"
   2. Allow user to filter based on specific vendors, e.g. "molport, emolecules"

- The above search or sort functionality should be easily callable via API, but the specific method is for you to choose (separate search endpoint, as params in `/routes`, etc.)
- Including the search functionality in the frontend is not required. However, you must show usability of the API. Be prepared to demo the API usage during the review of your solution. Options for visualizing the API include `cURL`, a Jupyter Notebook or python script using the `requests` library, or `Postman` or a similar tool. 

5. There are a lot of cool things we can think about adding to this representation of the routes. Try to implement one of the following features:
   1. Fuzzy search for reactions - given a reaction name that doesn't match any of the existing names, return closest matches based on a metric of your choice.
   2. Autocomplete - given a partial reaction name sent by the UI, provide the closest matching reaction name based on a metric of your choice
   3. Lead Time Range - Given a minimum and maximum lead time, find all routes where all component molecules fit within the given lead time range. This should work with the existing vendor filter from #4.
   4. Implement a Structure Search - choose this one if you would like to dig further into the the chemistry. Using a given SMILES, find all routes where a SMILES in the route contains the provided structure. Helpful functions include `MolFromSmiles` and `HasSubstructMatch`. For example, a search SMILES might be: `Clc1ccccc1`, which returns all routes that include at least one compound that has that substructure. An example SMILES with that substructure is `O=C(Cn1nnc2ccccc21)N(Cc1ccsc1)c1ccc(Cl)cc1`. We are happy to answer questions if you need clarification on substructure.


We'll ask you to give us a tour of what you've built and share with us how you
technically approached the problem.

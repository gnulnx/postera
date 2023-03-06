# PostEra Retrosynthetic Viewer

## Overview

It's always a good idea to understand the project as well as the data used.

For this example, routes.json is a list of 30 or so synthetic routes all for the same final product defined by the SMILES string: O=C(Cn1nnc2ccccc21)N(Cc1ccsc1)c1ccc(Cl)cc1.

Typically, a compound of interest would be arrived at via high-throughput screening or virtual screening. In our case, we can assume that we have already determined that the above molecule is of interest, and we want to give the chemists a tool that will quickly help them narrow down a list of synthetic routes.


> ### Requirements
> - Use D3 Tree structure to display retrosynthetic route
> - Provide Ability to search and or filter to find desired synthetic route
> - Provider filtering based on vendor


> ### Features Delivered
> - Fully dockerized application
> - A Fuzzy Autocomplete Search
> - Exact match building block search
> - Vendor search, as well as vendor negation searches
> - Estimating lead time for synthetic route based on selected vendors.


I fully understand the requirement to do a substructure match against the list of reagents/building blocks, but in my opinion, this wouldn’t be useful for this kind of tool.

It seems more reasonable that a chemist would inquire, "We have these reagents in the lab, are there routes available
that we can use with our current reagents?"

A “Substructure search” would be most useful if you were looking for other compounds similar to our final product. Subsequently, you could perform a retrosynthetic analysis on them. However, to be honest, this might not be the best approach either. More likely you would resort to a molecular fingerprint-based approach, but I digress. :)

## Usage

### Project Startup with docker
> docker-compose up

This will build three fully contained containers.  
- frontend (gui)
- backend (api)
- elasticsearch (es)

Please note that the backend container takes a while to build the first time.
Conda is slow....

### Console based startup

I'm going to assume that you already have the conda based virtualenv with all the required packages installed.

You will still need to run the elasticsearch container
> docker up -d es

Open two consoles. 
In the first console navigate to the the frontend directory
> npm start

In the second console navigate to the backend directory
> python setup_es.py
> python main.py

## Technical Approach Used

The naive approach would have been to use Python and regular expressions to try and simulate search and filtering functionality. While this could likely be done to some degree, it would be equivalent to building a house using only a screwdriver.

Instead I choose to use elasticsearch as the backend data source.

> ### The basic approach is
> - Pre processing of query string
> - Submit searh to ES
> - Post process Elasticsearch

> ### This provided sereral advanatages.
> - I could build an autocomplete analyzer which enabled real-time typeahead searches
> - It was easy to include fuzzy matching against specific fields.
> - I could returned matched highlights, which was useful in determining vendors of interest
> - I could also do exact matching on reagent smiles strings

## Final Thoughts.

Thank you again for considering me. I actually enjoyed this take-home test. ;)


Thanks
John Fur

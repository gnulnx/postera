#!/usr/bin/env python

import json
from elasticsearch import Elasticsearch
es = Elasticsearch("http://localhost:9200")

# Read in routes
with open("app/routes.json") as f:
    routes = json.load(f)

# injest routes into es
for doc in routes:
    resp = es.index(index="routes", document=doc)

print(f"total docs ingested: {len(routes)}")
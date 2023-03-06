#!/usr/bin/env python

import json
import os
from elasticsearch import Elasticsearch

docker = os.environ.get("DOCKER")

if docker:
    es = Elasticsearch("http://es:9200")
else:
    es = Elasticsearch("http://localhost:9200")

index_name = 'routes'

# Delete old index before rebuilding
es.indices.delete(index=index_name, ignore=[400, 404])

# Create our index and close it so we can apply settings and mappings
es.indices.create(index=index_name, ignore=400)
es.indices.close(index=index_name)

# Apply settings for autocomple aaylzer with edge_ngram filtering
es.indices.put_settings(index=index_name, body={
    "analysis": {
        "filter": {
            "autocomplete_filter": {
                "type": "edge_ngram",
                "min_gram": 1,
                "max_gram": 10
            }
        },
        "analyzer": {
            "autocomplete": { 
                "type": "custom",
                "tokenizer": "standard",
                "filter": [
                "lowercase",
                "autocomplete_filter"
                ]
            }
        }
    }
})

# Now map our autocomplete analyzer to relevant fields
es.indices.put_mapping(index=index_name, body={
    "properties": {
        "reactions": {
            "properties": {
                "name": {
                    "type": "text",
                    "analyzer": "autocomplete", 
                    "search_analyzer": "standard"
                }
            }
        },
        "molecules": {
            "properties": {
                "catalog_entries": {
                    "properties": {
                        "catalog_name": {
                            "type": "text",
                            "analyzer": "autocomplete", 
                            "search_analyzer": "standard"
                        }
                    }
                }
            }
        }
    },
})

es.indices.open(index=index_name)

# Read in routes
with open("app/routes.json") as f:
    routes = json.load(f)

# injest routes into es
for doc in routes:
    resp = es.index(index=index_name, document=doc)

print(f"total docs ingested: {len(routes)}")

#!/usr/bin/env bash


uvicorn --host 0.0.0.0 --port 8000 main:app

# Fail back in case startup fails and you
# need to get into the container and debug
tail -f /dev/null
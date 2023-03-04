#!/bin/bash

# Make sure we resrouce .bashrc to get all our conda paths setup correctly
source ~/.bashrc

conda activate postera
yes | conda install --file conda-packages.txt
pip install -r requirements.txt

# Start up the fastapi server
python main.py

# Fail back in case startup fails and you
# need to get into the container and debug
tail -f /dev/null
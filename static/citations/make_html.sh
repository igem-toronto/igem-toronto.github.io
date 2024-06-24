#!/bin/bash

pandoc --csl=nature.csl --citeproc --wrap=none -f markdown -t html template.md -o references.html
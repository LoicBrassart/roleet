#!/bin/bash

# Exécutez npm install dans chaque dossier spécifié en argument
for dossier in "$@"; do
  echo "Installation des dépendances dans $dossier..."
  cd "$dossier" && npm install && cd - > /dev/null
done
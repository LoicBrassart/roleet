## Presentation

- package.json

  - workspaces: factorisation du node_modules et des installations
  - commitizen: forcer à faire des commits corrects

- services clés en main hors fomration

  - redis: db key:value
  - rabbitMQ: (db) messages interservices asynchrones

- realtime

  - temps reel et messages serveur->client
  - prise en compte de l'auth
    - ❓possibilité d'externaliser l'auth ?

- files

  - serveur Express simple
  - stockage des uploads dans un volume pour la persistence
    - (inutile pour le moment puisque le persist est detruit à chaque reboot en dev)

- backend

  - middlewares: Cache
  - entities:PoI: @Unique
  - ❓entities:Stats: pas eu le choix pour cette methode
  - entities, resolvers: index.ts contient la liste ( ⚠️à tenir à jour)
  - seeding:
    - separation script/data
    - 🧰 pas encore factorisé, redondances

- frontend:
  - types:entities: calculé à partir du backend dispo pour la cohérence
  - atomic design simplifié
    - atoms: remplacements de balises html
    - organisms:entities: permet d'entreproser les briques de construction des entités métier
    - pages: contient aussi le layout et une séparation des pages publiques/privées

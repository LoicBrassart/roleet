## Authentification

### Concepts

- ✅ Enregistrement

  - Décliner mon identité complète

- ✅ Authentification (🇺🇸 Authentication)

  - Décliner mon identité et une info permettant de prouver mes dires (password), et recevoir une preuve du serveur

- ✅ Autorisation (🇺🇸 Authorization)
  - Le serveur détermine en fonction de mon identité quelles actions je peux mener

### Backend

- Créer une entité User
  - id
  - mail
  - hashedPassword
  - roles
  - [optionnel] name
- Créer un UserResolver pour l'api GraphQL
  - mutation signup
    - hash de password
    - création/sauvegarde d'User
    - [optionnel]créer un token
    - [optionnel]enregistrer enregistrer en cookie
    - [optionnel] renvoyer un profil public
  - mutation login
    - chercher un User compatible
    - vérifier les hashs des passwords (fourni vs enregistré en db)
    - créer un token
    - enregistrer le token en cookie
    - [optionnel] renvoyer un profil public
  - [optionnel] mutation logout
    - détruire le cookie
- Implement authChecker and context middleware
- Add logic to AdResolver to protect routes and link author to content

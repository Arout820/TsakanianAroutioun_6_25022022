[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arout820_TsakanianAroutioun_6_25022022&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arout820_TsakanianAroutioun_6_25022022)
# Piquante - Construire une API sécurisée pour une application d'avis gastronomiques

Ici j'explique comment lancer le projet, les dépendances, et l'utilisation de l'api.

Pour relier le front et le back :
Il faudra avoir la partie front à cloner dans [le dépôt Github](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

À ne pas oublier de respecter les prérequis inscrits dans le fichier readme de la partie front.

## Installation

Pour installer le backend il faudra cloner mon dépôt github:

```bash
  git clone git@github.com:Arout820/TsakanianAroutioun_6_25022022.git
```

Pour lancer le serveur il faut faire : 

```bash
  npm start
```


 ## Les dépendances utilisées pour le projet

- express
- mongoose
- mongoose-unique-validator
- dotenv
- nodemon
- bcrypt
- jsonwebtoken
- multer
- helmet

# Variable d'environnement

Dans mon projet j'ai utilsé les variables d'environnements.

Dans le fichier .env.example on supprime le .example et on remplace les contenus des variables 
entre les '' avec nos propres variables.

```
PORT = 'Le port utilisé 3000 la plupart du temps'

DB_USERNAME = 'Utilisateur sur MangoDB'
DB_PASSWORD = 'Password associé à l'utilisateur'
DB_NAME = 'Nom de la base de donnée'

TOKEN = 'Clé de chiffrement à créer permettant d'encrypter'
```

# Routes

Fonctionneront lorsque le serveur sera lancé avec node server ou nodemon server, ou avec npm start 
si préalablement vous avez mis un script dans le fichier package.json

Pour s'inscrire (route POST):
http://localhost:3000/api/auth/signup

Pour se connecter (route POST):
http://localhost:3000/api/auth/login

Pour retrouver les sauces (route GET):
http://localhost:3000/api/sauces

Pour retrouver une sauce en particulier, le modifier ou le supprimer (routes GET, PUT et DELETE) :
http://localhost:3000/api/sauces:id

## 🛠 Skills
Je suis un développeur **Full Stack spécialisé React**.

J'utilise l'outil de versioning Git et GitHub, je mets en place les bonnes pratiques pour 
le référencement naturel, pour les normes d'accessibilité ainsi que pour le respect des performances.

**Front** : React, Vanilla Javascript, HTML, CSS, Sass, Autoformation Next.js💪

**Back** : Node.js avec Express, MongoDB, mySQL 


##  Mon profil Linkedin
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aroutiountsakanian/)
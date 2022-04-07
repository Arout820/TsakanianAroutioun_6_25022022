# Backend

Ici j'explique comment lancer le projet, les dépendances, et l'utilisation de l'api.

Pour relier le front et le back :
Il faudra avoir la partie front clonable sur https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
A ne pas oublier de respecter les prérequis inscrit dans le fichier readme de la partie front.

## Installation

Installation de package avec npm install ou npm i

Dépendances :

```bash
  npm i express
  npm i --save mongoose
  npm i --save mongoose-unique-validator
  npm i --save dotenv
  npm i --save bcrypt
  npm i --save jsonwebtoken
  npm i --save multer
  npm i --save helmet
```

Dépendances Dév:

```bash
  npm i --save-dev nodemon
```

Résumé :

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

Fonctionneront lorsque le serveur sera lancé avec node server ou nodemon server

Pour s'inscrire (route POST):
http://localhost:3000/api/auth/signup

Pour se connecter (route POST):
http://localhost:3000/api/auth/login

Pour retrouver les sauces (route GET):
http://localhost:3000/api/sauces

Pour retrouver une sauce en particulier, le modifier ou le supprimer (routes GET, PUT et DELETE) :
http://localhost:3000/api/sauces:id

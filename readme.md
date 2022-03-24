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

Il faudra créer un fichier .env et le mettre dans .gitignore

Dans ce fichier crée les variables et on modifie les <> à modifier par les informations demandés

```
PORT = <Le port utilisé 3000 la plupart du temps>
DB_DATABASE = <Lien avec la base de données>
TOKEN = <Clé de chiffrement à créer permettant d'encrypter>
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

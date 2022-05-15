// importations des dépendances
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

// importations des routes
const userRoutes = require('./routes/user.routes');
const sauceRoutes = require('./routes/sauce.routes');

// permettre l'utilisation de variables d'environnement
require('dotenv').config();

// connection à la base de données mongoose
mongoose
  .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wcy5k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// crée une application express
const app = express();
console.log('Connecté au serveur');

// permet de débloquer le fait que le front et le back proviennent de sources différentes
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// pour respecter plus de normes de sécurité
app.use(helmet());

// permet d'analyser le corps de la requête en le transformant en json
app.use(express.json());

// multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;


// importation de express
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const sauceRoutes = require('./routes/sauce.routes');

require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wcy5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// crée une application express
const app = express();
console.log('Connecté au serveur');

app.use(helmet());

// permet de débloquer le faite que le front et le back proviennent de sources différentes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// permet d'analyser le corps de la requête en le transformant en json
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

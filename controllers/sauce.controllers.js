const Sauce = require('../models/Sauce');
const fs = require('fs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// ----------------------- Renvoie tableau de sauces ----------------------- //
exports.getAllSauces = (_req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((_error) => res.status(400).json({ error: 'Aucune sauce disponible' }));
};

// --------------------------- Renvoie une sauce --------------------------- //
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((_error) => res.status(400).json({ error: "Cette sauce n'existe pas !" }));
};

// ---------------- Ajoute une sauce dans un tableau de sauces ---------------- //
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  console.log(' ------SAUCE CREE------');
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

// -------------------------- Modifie une sauce -------------------------- //
exports.modifySauce = (req, res) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;

      if (sauce.userId !== userId) {
        return res.status(401).json({ error: 'Désolé mais vous ne pouvez pas modifier les sauces des autres !' });
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// --------------------------- Supprime une sauce --------------------------- //
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;

      if (sauce.userId !== userId) {
        return res.status(401).json({ error: 'Désolé mais vous ne pouvez pas supprimer les sauces des autres !' });
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimée !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// ----------------------- LikeDislike d'une sauce ----------------------- //
exports.reputationSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 1:
          // on like
          if (!sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: 'Like + 1' }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1:
          // on dislike
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: 'Dislike +1' }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0:
          // on enleve un like
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: 'Like -1' }))
              .catch((error) => res.status(400).json({ error }));
          }

          // on enleve un dislike
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(201).json({ message: 'Dislike -1' }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        default:
          break;
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

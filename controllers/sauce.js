const Sauce = require("../models/Sauce");

// ---------------- Ajoute une sauce dans un tableau de sauces ---------------- //

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  console.log(req.body);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(" ------SAUCE CREE-----");
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

// ----------------------- Renvoie tableau de sauces ----------------------- //

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) =>
      res.status(400).json({ error: "Aucune sauce disponible" })
    );
};

// --------------------------- Renvoie une sauce --------------------------- //

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(400).json({ error: "Cette sauce n'existe pas" })
    );
};

// --------------------------- Supprime une sauce --------------------------- //

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ error: "Sauce non trouvé" });
      }
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) =>
      res.status(400).json({ error: "Cette sauce n'existe pas" })
    );
};

// -------------------------- Modifie une sauce -------------------------- //

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// // ----------------------- LikeDislike d'une sauce ----------------------- //

// exports.reputationSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id })
//     .then(objet => {
//         const sauceId = {_id: req.params.id}
//         console.log(sauceId);
//         }
//     })
//     .catch(error => res.status(404).json({ error: 'holy shit' }));
// };

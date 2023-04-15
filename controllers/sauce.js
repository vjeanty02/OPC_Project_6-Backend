const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAll = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOne = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.create = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject.userId;
  const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => { res.status(201).json({message: 'Sauce enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.modify = (req, res, next) => {  
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete sauceObject.userId;
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Non autorisé'});
          } else {
              Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink('images/' + filename, () => {});
            return res.status(200).json({message : 'Sauce modifié!'})
              })
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.delete = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Non autorisé'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
}

// Constantes pour les valeurs de like
const LIKE = 1;
const DISLIKE = -1;
const NEUTRAL = 0;

exports.like = (req, res, next) => {
    const { userId, like } = req.body; 
    const sauceId = req.params.id; 

    const updateSauce = (update) => {
        Sauce.updateOne({ _id: sauceId }, update)
            .then(() => res.status(200).json({ message: 'Sauce mise à jour !' }))
            .catch(error => res.status(401).json({ error }));
    };

    switch (like) {
        case LIKE: // Cas du like
            updateSauce({ $push: { usersLiked: userId }, $inc: { likes: +1 } });
            break;
        case DISLIKE: // Cas du dislike
            updateSauce({ $push: { usersDisliked: userId }, $inc: { dislikes: +1 } });
            break;
        case NEUTRAL: // Cas du like ou dislike annulé
            Sauce.findOne({ _id: sauceId })
                .then(sauce => {
                    if (sauce.usersLiked.includes(userId)) { // Si l'utilisateur avait liké la sauce
                        updateSauce({ $pull: { usersLiked: userId }, $inc: { likes: -1 } });
                    } else if (sauce.usersDisliked.includes(userId)) { // Si l'utilisateur avait disliké la sauce
                        updateSauce({ $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } });
                    }
                })
                .catch(error => res.status(401).json({ error }));
            break;
        default:
            res.status(400).json({ message: 'Valeur de like invalide !' }); // Cas d'une valeur de like incorrecte
    }
};


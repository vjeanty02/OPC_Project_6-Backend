const Sauce = require('../models/Sauce.js');
const fs = require('fs');

exports.getAll = (req, res, next) => {
Sauce.find()
    .then(Sauces => {
      res.status(200).json({products:Sauces});
      console.log('GET request successful');
    })
    .catch(error => {
      res.status(400).json({ error });
      console.log('GET request failed. Error:', error);
    });
};

exports.getOne = (req, res, next) => {
Sauce.findOne({ _id: req.params.id })
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('GET:id request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('GET request failed. Error:', error);
  });
};

exports.create = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('POST request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('POST request failed. Error:', error);
  });
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
              console.log('Non autorisé');

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
};


exports.like = (req , res) => {
    
}


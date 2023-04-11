const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce.js');

// Créer une route GET qui retournera tous les produits
router.get('/', (req, res) => {
Sauce.find()
    .then(Sauces => {
      res.status(200).json({products:Sauces});
      console.log('GET request successful');
    })
    .catch(error => {
      res.status(400).json({ error });
      console.log('GET request failed. Error:', error);
    });
});

// Créer une route GET qui retournera le produit avec l'_id fourni
router.get('/api/sauces/:id', (req, res) => {
Sauce.findOne({ _id: req.params.id })
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('GET:id request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('GET request failed. Error:', error);
  });
});

// Créer une route POST qui créera un nouveau Product dans la base de données, en utilisant la méthode app.post d’express
router.post('/api/sauces', (req, res) => {
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
});

// Créer une route PUT qui modifiera le produit avec l'_id fourni
router.put('/api/sauces/:id', (req, res) => {
Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => {
    res.status(200).json({ product: req.body});
    console.log('PUT request successful');
  })
  .catch(error => {
    res.status(400).json({ error });
    console.log('PUT request failed. Error:', error);
  });
});

// Créer une route DELETE qui supprimera le produit avec le _id fourni
router.delete('/api/sauces/:id', (req, res) => {
Sauce.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({ message: 'Objet supprimé !'})
    console.log('DELETE request successful');
})
  .catch(error => {
    res.status(400).json({ error })});
    console.log('DELETE request failed. Error:', error);
});

module.exports = router;
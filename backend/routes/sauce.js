const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce.js')

// Créer une route GET qui retournera tous les produits
router.get('/', sauceCtrl.getAll);

// Créer une route GET qui retournera le produit avec l'_id fourni
router.get('/:id', sauceCtrl.getOne);

// Créer une route POST qui créera un nouveau Product dans la base de données, en utilisant la méthode app.post d’express
router.post('/', sauceCtrl.create);

// Créer une route PUT qui modifiera le produit avec l'_id fourni
router.put('/:id', sauceCtrl.modify);

// Créer une route DELETE qui supprimera le produit avec le _id fourni
router.delete('/:id', sauceCtrl.delete);


module.exports = router;
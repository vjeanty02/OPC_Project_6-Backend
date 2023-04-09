//Etapes necessaires pour la creation d'un server web avec express

// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// creation d'une application express
const app = express(); 

// Middleware pour gérer les requêtes
app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
    next();
  });

// créer les routes 
// démarre le serveur et affiche un message dans la console
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


//Etapes necessaires pour la creation d'un server web avec express

// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// creation d'une application express
const app = express(); 


// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect('mongodb+srv://vjeanty02:jesus123@cluster0.1sagvzb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
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


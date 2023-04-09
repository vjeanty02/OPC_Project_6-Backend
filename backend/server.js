//Etapes necessaires pour la creation d'un server web avec express

// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');

// Définir le port d'écoute
const port = process.env.PORT || 3000;

// creation d'une application express
const app = express(); 

// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect('mongodb+srv://vjeanty02:jesus123@cluster0.1sagvzb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définir un schéma pour les données
const thingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// Créer un modèle à partir du schéma
const Thing = mongoose.model('Thing', thingSchema);

// Middleware pour gérer les requêtes
app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
    next();
  });

// Utiliser le middleware express.json() pour parser les requêtes avec des données au format JSON
app.use(express.json());

// Créer une route GET qui retournera tous les produits
app.get('/sauces', (req, res) => {
  Thing.find()
    .then(Sauces => {
      console.log('GET request successful');
      res.status(200).json({products:Sauces});
    })
    .catch(error => {
      console.log('GET request failed. Error:', error);
      res.status(400).json({ error });
    });
});

// Créer une route GET qui retournera le produit avec l'_id fourni
app.get('/sauces/:id', (req, res) => {
  Thing.findOne({ _id: req.params.id })
  .then(Sauce => {
    console.log('GET:id request successful');
    res.status(200).json({product:Sauce});
  })
  .catch(error => {
    console.log('GET request failed. Error:', error);
    res.status(404).json({ error });
  });
});

// crée une route POST qui créera un nouveau Product dans la base de données, en utilisant la méthode app.post d’express
app.post('/sauces', (req, res) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
  .then(Sauce => {
    console.log('POST request successful');
    res.status(200).json({product:Sauce});
  })
  .catch(error => {
    console.log('POST request failed. Error:', error);
    res.status(404).json({ error });
  });
});

// Créer une route PUT qui modifiera le produit avec l'_id fourni
app.put('/sauces/:id', (req, res) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => {
    console.log('PUT request successful');
    res.status(200).json({ product: req.body});
  })
  .catch(error => {
    console.log('PUT request failed. Error:', error);
    res.status(400).json({ error });
  });
});

// crée une route DELETE qui supprimera le produit avec le _id fourni
app.delete('/sauces/:id', (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => {
    console.log('DELETE request successful');
    res.status(200).json({ message: 'Objet supprimé !'})
})
  .catch(error => {
    console.log('DELETE request failed. Error:', error);
    res.status(400).json({ error })});
});

// Démarre le serveur et affiche un message dans la console
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const app = require('./app');

// Définir le port d'écoute
const port = process.env.PORT || 3000;

// Démarres le serveur et affiche un message dans la console
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
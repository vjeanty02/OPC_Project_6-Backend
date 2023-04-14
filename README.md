# OPC_Project_6

## Description

C'est un projet étudiant du parcours développeur web Openclassroom qui consiste à créer une API sécurisée pour une application d'avis gastronomiques (Piquante). Ceci est la partie backend. Vous pouvez trouver la partie frontend sur : https://github.com/vjeanty02/OPC_Project_6-frontend.git

## Technologies

Ce projet utilise les technologies suivantes:

- npm
- express
- mongoose
- mongoose-unique-validator
- cors
- nodemon
- bcrypt
- ddos
- dotenv
- helmet
- jsonwebtoken
- multer

## Fonctionnalités

L'utilisateur peut :

- Créer un compte
- Se connecter et se déconnecter
- Ajouter des produits à vendre avec des images et des descriptions
- Modifier et supprimer des produits  
- Voir les produits des autres utilisateurs
- Liker et disliker les produits
- Retirer les likes et les dislikes au besoin

## Installation et exécution

Pour installer et exécuter ce projet, vous devez installer la partie frontend et la partie backend:

1. Cloner d'abord la partie frontend avec la commande : `git clone https://github.com/vjeanty02/OPC_Project_6-frontend.git`
2. Ouvrir le dossier dans un terminal et lancer les commandes `npm install` et `npm start`
3. Ouvrir le navigateur, aller sur `localhost:4200/` et le frontend est prêt à recevoir le backend
4. Cloner ensuite la partie backend avec la commande : `git clone https://github.com/vjeanty02/OPC_Project_6-backend.git`
5. Ouvrir le projet dans un terminal, s'il n'existe pas déjà, créer un fichier `.env` avec le code suivant :

  `DB_URL= <Votre_Url_de_connexion_MongoDB>
   SECRET=<Votre_TOKEN>`. 
   
6. Lancer les commandes `npm install` et `npm start`. 
7. Ouvrir un navigateur, aller sur `localhost:4200/` et profiter de l'application


## Licence et contribution

Ce projet est sous licence MIT. Vous pouvez le copier, le modifier et le redistribuer librement.

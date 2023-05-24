# Utilisez l'image officielle de Node.js
FROM node:latest

# Créez un répertoire dans /usr/src/app
RUN mkdir -p /usr/src/app

# Définissez le répertoire de travail
WORKDIR /usr/src/app

# Copiez le contenu du répertoire actuel dans le répertoire créé
COPY . /usr/src/app

# Installez les dépendances
RUN npm install

# Exposez le port
EXPOSE 3000

# Démarrez l'application
CMD ["npm", "start"]

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// URL des services d'étudiants
const studentsServiceURL = 'http://localhost:3000';

app.use(express.json());

// Middleware pour rediriger les requêtes vers les services d'étudiants
app.use('/api/students', (req, res) => {
  const { method, url, body } = req;
  const requestURL = `${studentsServiceURL}${url}`;

  axios({
    method,
    url: requestURL,
    data: body,
  })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      const statusCode = error.response ? error.response.status : 500;
      res.status(statusCode).json({
        error: error.message,
      });
    });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}!`);
});

// Import des modules nécessaires
const express = require('express');
const app = express();

// Middleware pour parser les données au format JSON
app.use(express.json());

// Tableau pour stocker les étudiants
let students = [];

// Route pour créer un nouvel étudiant
app.post('/students', (req, res) => {
  const { id, prenom, nom, age } = req.body;

  // Vérification des données requises
  if (!id || !prenom || !nom || !age) {
    return res.status(400).json({ message: 'Tous les champs doivent être renseignés.' });
  }

  // Création de l'étudiant
  const newStudent = { id, prenom, nom, age };
  students.push(newStudent);

  return res.status(201).json(newStudent);
});

// Route pour lister tous les étudiants
app.get('/students', (req, res) => {
  return res.json(students);
});

// Route pour modifier un étudiant existant
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { prenom, nom, age } = req.body;

  // Recherche de l'étudiant par son ID
  const student = students.find((s) => s.id === studentId);

  // Vérification si l'étudiant existe
  if (!student) {
    return res.status(404).json({ message: 'Étudiant non trouvé.' });
  }

  // Mise à jour des données de l'étudiant
  student.prenom = prenom || student.prenom;
  student.nom = nom || student.nom;
  student.age = age || student.age;

  return res.json(student);
});

// Route pour supprimer un étudiant existant
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;

  // Recherche de l'index de l'étudiant par son ID
  const studentIndex = students.findIndex((s) => s.id === studentId);

  // Vérification si l'étudiant existe
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Étudiant non trouvé.' });
  }

  // Suppression de l'étudiant du tableau
  students.splice(studentIndex, 1);

  return res.json({ message: 'Étudiant supprimé avec succès.' });
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}.`);
});

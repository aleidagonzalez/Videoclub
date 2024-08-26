const express = require('express');
const router = express.Router();

// Ruta GET para /register
router.get('/register', (req, res) => {
    res.send('Registration page');
});

// Ruta POST para registrar usuarios
router.post('/register', (req, res) => {
    // Lógica para registrar usuarios
    res.send('User registered');
});

module.exports = router;
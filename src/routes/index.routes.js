const express = require('express');
const { renderIndex, renderAbout } = require('../controllers/index.controller');

const router = express.Router();

// Rutas
router.get('/', renderIndex);
router.get('/about', renderAbout);

module.exports = router;
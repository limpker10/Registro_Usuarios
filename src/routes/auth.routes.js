const express = require('express');
const { renderSignUpForm, signup, renderSigninForm,filterUsuarios } = require('../controllers/auth.controllers');
const authMiddlewaress = require('../middleware/authMiddleware');

const router = express.Router();

// Aplicar el middleware a todas las rutas de este router
router.use(authMiddlewaress);

// Rutas
router.get('/signup', renderSignUpForm);

router.post('/signup', signup);

router.get('/signin', renderSigninForm);

router.post('/filter', filterUsuarios);

module.exports = router;
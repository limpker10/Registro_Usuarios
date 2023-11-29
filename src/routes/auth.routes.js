const express = require('express');
const { renderSignUpForm, signup, renderSigninForm } = require('../controllers/auth.controllers');

const router = express.Router();

// Rutas
router.get('/auth/signup', renderSignUpForm);

router.post('/auth/signup', signup);

router.get('/auth/signin', renderSigninForm);

module.exports = router;
// authController.js
const userService = require('../services/userService');

const renderSignUpForm = (req, res) => res.render('auth/signup');

const signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const userData = { name, email, password };

  let errors = userService.validateUser(userData);

  if (errors.length > 0) {
    return res.render('auth/signup', {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  await userService.addUser(userData);
  res.redirect('/auth/signin');
};

const renderSigninForm = (req, res) => res.render('auth/signin');

const filterUsuarios = (req,res) => {
  const { fullNameSearch, startDate, endDate, statusSelector } = req.body;

  // Aquí implementas tu lógica de filtrado
  // Por ejemplo, filtrar un array de usuarios u obtener resultados de una base de datos

  // Renderizar la vista con los datos filtrados
  res.render('tuVista', { usuariosFiltrados });
}

module.exports = {
  renderSignUpForm,
  signup,
  renderSigninForm,
  filterUsuarios
};

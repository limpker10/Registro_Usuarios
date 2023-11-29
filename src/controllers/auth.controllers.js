// Función para renderizar el formulario de registro
const renderSignUpForm = (req, res) => res.render('auth/signup');

// Función para el proceso de registro
const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: 'Passwords do not match.' });
  }

  if (password.length < 4) {
    errors.push({ text: 'Passwords must be at least 4 characters.' });
  }

  if (errors.length > 0) {
    return res.render('auth/signup', {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Redirigir al formulario de inicio de sesión tras un registro exitoso
  res.redirect('/auth/signin');
};

// Función para renderizar el formulario de inicio de sesión
const renderSigninForm = (req, res) => res.render('auth/signin');

// Exportando las funciones
module.exports = {
  renderSignUpForm,
  signup,
  renderSigninForm
};

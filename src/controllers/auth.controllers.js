// Función para renderizar el formulario de registro
const renderSignUpForm = (req, res) => res.render('auth/signup');

// Función para el proceso de registro
const signup = async (req, res) => {
  let errors = [];
  const { nombre, apellido, numeroDeCelular, departamento, provincia, distrito, direccionExacta, email, tipoDeDocumento, numeroDeDocumento, contrasena, confirmarContrasena } = req.body;
  if (contrasena !== confirmarContrasena) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }

  if (contrasena.length < 8) {
    errors.push({ text: 'La contraseña debe tener 8 caracteres como minimo.' });
  }
  if (contrasena.length > 20) {
    errors.push({ text: 'La contraseña debe tener 20 caracteres como máximo.' });
  }
  if (!email) {
    errors.push({ text: 'El correo no puede estar vacío' });
  }
  if (!nombre) {
    errors.push({ text: 'El nombre no puede estar vacío' });
  }
  if (!apellido) {
    errors.push({ text: 'El apellido no puede estar vacío' });
  }
  if (!numeroDeCelular) {
    errors.push({ text: 'El número de celular no puede estar vacío' });
  }
  if (!departamento) {
    errors.push({ text: 'El departamento no puede estar vacío' });
  }
  if (!provincia) {
    errors.push({ text: 'La provincia no puede estar vacía' });
  }
  if (!distrito) {
    errors.push({ text: 'El distrito no puede estar vacío' });
  }
  if (!direccionExacta) {
    errors.push({ text: 'La dirección exacta no puede estar vacía' });
  }
  if (!tipoDeDocumento) {
    errors.push({ text: 'El tipo de documento no puede estar vacío' });
  }
  if (!numeroDeDocumento) {
    errors.push({ text: 'El número de documento no puede estar vacío' });
  }
  if (!contrasena) {
    errors.push({ text: 'La contraseña no puede estar vacía' });
  }
  if (!confirmarContrasena) {
    errors.push({ text: 'La contraseña no puede estar vacía' });
  }
  if (tipoDeDocumento == "DNI") {
    if (numeroDeDocumento.length != 8) {
      errors.push({ text: 'El número de DNI tiene 8 digitos' });
    }
  }
  if (tipoDeDocumento == "RUC") {
    if (numeroDeDocumento.length != 11) {
      errors.push({ text: 'El número de RUC tiene 11 digitos' });
    }
  }

  if (errors.length > 0) {
    return res.render('auth/signup', {
      errors,
      nombre,
      apellido,
      numeroDeCelular,
      departamento,
      provincia,
      distrito,
      direccionExacta,
      email,
      tipoDeDocumento,
      numeroDeDocumento,
      contrasena,
      confirmarContrasena,
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

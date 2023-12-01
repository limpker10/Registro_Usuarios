// Función para renderizar el formulario de registro
const renderSignUpForm = (req, res) => res.render('auth/signup');
// Array donde se guardaran los datos
const usuarios = [];
// Función para el proceso de registro
const signup = async (req, res) => {
  console.log(usuarios);
  let errors = [];
  var verificacionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
  var verificacionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { nombre, apellido, numeroDeCelular, departamento, provincia, distrito, direccionExacta, email, tipoDeDocumento, numeroDeDocumento, contrasena, confirmarContrasena } = req.body;

  if (!email || !nombre || !apellido || !numeroDeCelular || !departamento || !provincia || !distrito || !direccionExacta || !tipoDeDocumento || !numeroDeDocumento || !contrasena || !confirmarContrasena) {
    errors.push({ text: 'Todos los campos deben ser llenados' });
  } else {
    if (numeroDeCelular.length < 9 || numeroDeCelular.length > 9) {
      errors.push({ text: 'El numero de cleular debe tener 9 digitos' });
    } else {
      if (tipoDeDocumento == "DNI") {
        if (numeroDeDocumento.length != 8) {
          errors.push({ text: 'El número de DNI tiene 8 digitos' });
        }
      }
      if (tipoDeDocumento == "C.E") {
      }
      if (tipoDeDocumento == "RUC") {
        if (numeroDeDocumento.length != 11) {
          errors.push({ text: 'El número de RUC tiene 11 digitos' });
        }
      }
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
  // Pusheo de los datos del usuario al array
  const nuevoUsuario = {
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
  };
  usuarios.push(nuevoUsuario);
  // Redirigir al formulario de inicio de sesión tras un registro exitoso
  res.redirect('/auth/signin');
};

// Función para renderizar el formulario de inicio de sesión
const renderSigninForm = (req, res) => res.render('auth/signin');

// Exportando las funciones
module.exports = {
  renderSignUpForm,
  signup,
  renderSigninForm,
  usuarios
};

// authController.js
const userService = require('../services/userService');

const renderSignUpForm = (req, res) => res.render('auth/signup');

// Array donde se guardaran los datos
const usuarios = userService.obtenerUsuarios();

// Función para el proceso de registro
const signup = async (req, res) => {
  let errors = [];
  const fechaActual = new Date();

  // Obtener año, mes y día
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();
  const horaFormateada = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
  let estado = true;
  // variable para la verificacion de la contraseña
  var verificacionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;

  // variables principales
  const { nombre, apellido, numeroDeCelular, departamento, provincia, distrito, direccionExacta, email, tipoDeDocumento, numeroDeDocumento, contrasena, confirmarContrasena } = req.body;
  //validaciones
  if (!email || !nombre || !apellido || !numeroDeCelular || !departamento || !provincia || !distrito || !direccionExacta || !tipoDeDocumento || !numeroDeDocumento || !contrasena || !confirmarContrasena) {
    errors.push({ text: 'Todos los campos deben ser llenados' });
  } else {
    if (numeroDeCelular.length < 9 || numeroDeCelular.length > 9) {
      errors.push({ text: 'El numero de celular debe tener 9 digitos' });
    } else {
      if (verificacionContrasena.test(contrasena)) {
        if (contrasena !== confirmarContrasena) {
          errors.push({ text: 'Las contraseñas no coinciden' });
        } else {
          if (tipoDeDocumento == "DNI") {
            if (numeroDeDocumento.length != 8) {
              errors.push({ text: 'El número de DNI tiene 8 digitos' });
            } else {
              let rucRepetido = false;
              for (let i = 0; i < usuarios.length; i++) {
                console.log(numeroDeDocumento);
                console.log(usuarios[i].numeroDeDocumento);
                if (numeroDeDocumento === usuarios[i].numeroDeDocumento && tipoDeDocumento === usuarios[i].tipoDeDocumento) {
                  errors.push({ text: 'Este DNI ya está registrado' });
                  rucRepetido = true;
                  break;
                }
              }
              if (!rucRepetido) {
                console.log("No hay coincidencias, continuar con la lógica");
              }
            }
          }
          if (tipoDeDocumento == "C.E") {
            let rucRepetido = false;

            for (let i = 0; i < usuarios.length; i++) {
              console.log(numeroDeDocumento);
              console.log(usuarios[i].numeroDeDocumento);
              if (numeroDeDocumento === usuarios[i].numeroDeDocumento && tipoDeDocumento === usuarios[i].tipoDeDocumento) {
                errors.push({ text: 'Este C.E ya está registrado' });
                rucRepetido = true;
                break;
              }
            }
            if (!rucRepetido) {
              console.log("No hay coincidencias, continuar con la lógica");
            }
          }
          if (tipoDeDocumento === "RUC") {
            if (numeroDeDocumento.length !== 11) {
              errors.push({ text: 'El número de RUC debe tener 11 dígitos' });
            } else {
              let rucRepetido = false;

              for (let i = 0; i < usuarios.length; i++) {
                console.log(numeroDeDocumento);
                console.log(usuarios[i].numeroDeDocumento);
                if (numeroDeDocumento === usuarios[i].numeroDeDocumento && tipoDeDocumento === usuarios[i].tipoDeDocumento) {
                  errors.push({ text: 'Este RUC ya está registrado' });
                  rucRepetido = true;
                  break;
                }
              }
              if (!rucRepetido) {
                //console.log("No hay coincidencias, continuar con la lógica");
              }
            }
          }

        }
      } else {
        errors.push({ text: 'La contraseña debe tener al menos una mayuscula, un numero y un caracter especial' });
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
      horaFormateada,
      fechaFormateada
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
    horaFormateada,
    fechaFormateada,
    estado
  };
  //Cambio por userService
  await userService.agregarUsuario(nuevoUsuario);
  // Redirigir al formulario de inicio de sesión tras un registro exitoso
  res.redirect('/auth/signup');
};

const renderSigninForm = (req, res) => res.render('auth/signin');

module.exports = {
  renderSignUpForm,
  signup,
  renderSigninForm,
  usuarios
};


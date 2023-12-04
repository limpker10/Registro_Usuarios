// authMiddleware.js
const userService = require('../services/userService');

const authMiddlewaress = (req, res, next) => {
    // Asumiendo que getAuthSpecificData es una función que devuelve los datos deseados
    res.locals.usuarios = userService.obtenerUsuarios();
    res.locals.mostrarMostrarModal = true;
    res.locals.mostrarBoton = true;
    next();
};

module.exports = authMiddlewaress;
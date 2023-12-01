/*******************  Carga de Modulos   ******************************/
// Carga variables de entorno
require('dotenv').config();
// Importación de Express
const express = require('express');
// Motor de plantillas Handlebars para Express
const exphbs = require('express-handlebars');
// Rutas de la página de inicio
const indexRoutes = require('./routes/index.routes');
// Rutas para la autenticación de usuarios 
const userRoutes = require('./routes/auth.routes');
// Módulo de Node.js para trabajar con rutas de archivos
const path = require('path');
const bodyParser = require('body-parser');

// Inicializaciones
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// Configuraciones de la aplicación
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // Establecer el directorio de las vistas

// Configuración del motor de vistas (Handlebars)
const hbs = exphbs.create({
  defaultLayout: 'main', // Layout principal
  layoutsDir: path.join(app.get('views'), 'layouts'), // Directorio de layouts
  partialsDir: path.join(app.get('views'), 'components'), // Directorio de componentes reutilizables
  extname: '.hbs', // Extensión de los archivos de plantilla
});

app.engine('.hbs', hbs.engine); // Registrar el motor de plantillas
app.set('view engine', '.hbs'); // Establecer Handlebars como motor de vistas

/*******************  Rutas   ******************************/
app.use(indexRoutes); // Uso de rutas de la página de inicio
app.use(userRoutes); // Uso de rutas de autenticación de usuarios

/*******************  Archivos Estaticos   ******************************/
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

/*******************  Manejo de Errores   ******************************/
// Error 404
app.use((req, res, next) => {
  return res.status(404).render('404');
});

// Manejo de otros errores
app.use((error, req, res, next) => {
  res.status(error.status || 500); // Establecer el código de estado del error
  res.render('error', { // Renderizar la vista de error
    error,
  });
});

module.exports = app;
// Función para renderizar la página de inicio
const renderIndex = (req, res) => {
  res.render('index');
};

// Función para renderizar la página 'Acerca de'
const renderAbout = (req, res) => {
  res.render('about');
};

// Exportando las funciones
module.exports = {
  renderIndex,
  renderAbout
};

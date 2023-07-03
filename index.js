const express = require('express')
const app = express()
const port = 3001;
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
//ejs
app.set('view engine', 'ejs')

//database
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });
const connection = require('./database/db');

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/', require('./router'));

// Ruta para manejar el inicio de sesión
app.post('/', (req, res) => {
  const { user, pass } = req.body;

  // Realiza una consulta a la base de datos para verificar las credenciales
  const query = `SELECT * FROM empleado WHERE user = '${user}' AND pass = '${pass}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Las credenciales son válidas, obtener el tipo de usuario
      const tipoUsuario = results[0].tipoUsuario;

      // Renderiza la página de inicio y pasa el tipo de usuario como variable
      res.render('layouts/index', { tipoUsuario });
    } else {
      // Las credenciales son inválidas, se muestra un mensaje de error
      res.render('/index', { error: 'Credenciales inválidas' });
    }
  });
});
app.get('/index', (req, res) => {
  // Obtén el tipo de usuario desde la base de datos u otra fuente de datos
  const tipoUsuario = obtenerTipoUsuario();

  // Renderiza la plantilla index.ejs y pasa el valor de tipoUsuario como variable
  res.render('/index', { tipoUsuario });
});

// Ruta para obtener pedidos
async function obtenerProductos() {
  try {
    const response = await axios.get('http://lowedev.cl/api_musicpro/vendedor.php');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}
app.get('/vendedor', (req, res) => {
  obtenerProductos()
    .then((productos) => {
      res.render('vendedor/vendedor', { productos });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

async function obtenerPagos() {
  try {
    const response = await axios.get('http://lowedev.cl/api_musicpro/pagos.php');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}
// Ruta para obtener pagos
app.get('/pagosvendedor', (req, res) => {
  obtenerPagos()
    .then((compras) => {
      res.render('vendedor/pagosvendedor', { compras });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});


app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// Ruta de error 404
app.use(function (req, res, next) {
  res.status(404);
  res.render('error.ejs', { title: '404 - Not Found', message: 'Oops! Page not found.' });
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3001/`)
})
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

// definicion de rutas
//app.use(require('/routes'));
//app.use(require('/routes/authenticacion'));
//app.use(require('/routes/link'));


app.use('/', require('./router'));


// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
  const { user, pass, tipoUsuario } = req.body;

  const query = 'SELECT * FROM empleado WHERE user = ?';
  connection.query(query, [user], (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0 || pass !== results[0].pass) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const profileMap = {
      1: 'vendedor.ejs',
      2: 'bodeguero.ejs',
      3: 'contador.ejs',
      4: 'admin.ejs',
    };

    const ejsTemplate = profileMap[tipoUsuario];
    if (!ejsTemplate) {
      return res.status(401).json({ message: 'Tipo de usuario inválido' });
    }

    res.render(ejsTemplate, { userId: results[0].id });
  });
});
/////mostrat datos al vendedor////
//app.get('/vendedor', function (req, res) {
  //connection.query('SELECT * FROM productos', function (error, producto) {
   // if (error) {
    //  res.render('error', { message: 'Error al cargar los productos' });
    //} else {
    //  res.render('vendedor', { productos: producto });
    //}
  //});
//});
// Ruta para obtener pedidos
app.get('/pedidos', (req, res) => {
  connection.query('SELECT * FROM pedidos', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    } else {
      res.json(results);
    }
  });
});
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
      res.render('vendedor', { productos }); 
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
      res.render('pagosvendedor', { compras }); 
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
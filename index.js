const express = require('express')
const app = express()
const port = 3001
const session = require('express-session');
const bodyParser = require('body-parser');
//ejs
const ejs = require('ejs');
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


app.get('/vendedor', (req, res) => {
  res.render('vendedor.ejs')
});

app.get('/', (req, res) => {
  res.render('login')
});



//LOGIN
app.post("/auth", (req, res) => {
  const { correo, pass } = req.body;

  // Verificar si el correo y la contraseña son correctos (validación simple)
  if (user === "admin" && pass === "admin") {
    req.session.loggedin = true;
    req.session.user = user;
    // Redireccionar al usuario autenticado a la página deseada
    return res.redirect("/vendedor");
  }

  // En caso de credenciales incorrectas, mostrar un mensaje de error
  res.render("login", {
    alert: true,
    alertTitle: "Error",
    alertMessage: "Correo y/o contraseña incorrectos",
    alertIcon: "error",
    showConfirmButton: true,
    timer: false,
    ruta: "login",
  });
});

/////////

//const consulta = 'SELECT * FROM productos';

app.get('/', (req, res) => {
  connection.query('SELECT * FROM productos', (error, resultados) => {
    if (error) {
      console.error('Error al realizar la consulta: ', error);
      return;
    }
    res.render('vendedor', { productos: resultados });
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
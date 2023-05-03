const express = require('express')
const app = express()
const port = 3001
const session = require('express-session');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

const connection = require('./database/db'); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

// definicion de rutas

app.post('/', (req, res) => {
  const { username, password } = req.body;
  // Validar usuario y contraseña
  if (username === 'user' && password === '1234') {
    req.session.user = true;
    res.redirect('/dashboard');
  } else if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    res.redirect('/dashboard');
  } else {
    req.session.guest = true;
    res.redirect('/dashboard');
  }
});








app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname+'/public'));

// Ruta de error 404
app.use(function(req, res, next) {
  res.status(404);
  res.render('error.ejs', { title: '404 - Not Found', message: 'Oops! Page not found.' });
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:3001/`)
})
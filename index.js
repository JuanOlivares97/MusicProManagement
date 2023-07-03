const express = require('express')
const app = express()
const port = 3001;
const session = require('express-session');
const bodyParser = require('body-parser');

//ejs
app.set('view engine', 'ejs')
const contadorRoutes = require('./routes/contadorRoute.js')
const bodegueroRoutes = require('./routes/bodegueroRoute.js')
const vendedorRoutes = require('./routes/vendedorRoute.js')
const adminRoutes = require('./routes/adminRoute.js')
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

// Ruta para manejar el inicio de sesión
app.use('/contador', contadorRoutes)
app.use('/bodeguero', bodegueroRoutes)
app.use('/vendedor', vendedorRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res)=>{
  res.render('login')
})

app.post('/', (req, res) => {
  const { user, pass } = req.body;
  const query = `SELECT * FROM empleado WHERE user = '${user}' AND pass = '${pass}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    
    if (results.length > 0) {
      // Las credenciales son válidas, obtener el tipo de usuario
      const tipoUsuario = results[0].tipoUsuario;
      
      // Redirige a diferentes páginas de inicio según el tipo de usuario
      switch (tipoUsuario) {
        case 1:
          res.redirect('vendedor/');
          break;
        case 2:
          res.redirect('bodeguero/');
          break;
        case 3:
          res.redirect('admin/');
          break;
        case 4:
          res.redirect('contador/');
          break;
        default:
          console.log('Credenciales inválidas'); 
          res.redirect('/'); 
      }
    } else {
      console.log('Credenciales inválidas'); 
      res.redirect('/');
    }
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
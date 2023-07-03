const express = require('express')
const router = express.Router();

//ejs

//database
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });
const connection = require('./database/db');
module.exports = connection;

//definiendo las rutas
module.exports = router;

router.get('/',(req, res)=> {
  res.render('login');
})

router.get('/bodeguero',(req, res)=> {
  res.render('bodeguero');
})

router.get("/index", (req, res)=> {
  res.render("layouts/index");
});

router.get("/admin", (req, res)=> {
  res.render("vendedor/admin");
});

router.get("/cancelar", (req, res)=> {
  res.render("bodeguero/cancelarPedido");
});

router.use('/resources', express.static('public'));
router.use('/resources', express.static(__dirname + '/public'));
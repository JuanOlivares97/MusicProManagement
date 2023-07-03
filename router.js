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

router.get("/admin", (req, res)=> {
  res.render("admin/admin");
});

router.get("/cancelar", (req, res)=> {
  res.render("bodeguero/cancelarPedido");
});

router.get('/indexVendedor', (req, res) => {
  res.render('vendedor/indexVendedor');
});

router.get('/indexBodeguero', (req, res) => {
  res.render('bodeguero/indexBodeguero');
});

router.get('/indexContador', (req, res) => {
  res.render('contador/indexContador');
});

router.get('/indexAdmin', (req, res) => {
  res.render('admin/indexAdmin');
});



router.use('/resources', express.static('public'));
router.use('/resources', express.static(__dirname + '/public'));
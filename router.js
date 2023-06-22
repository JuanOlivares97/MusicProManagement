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
  res.render('bodeguero');
})

router.get('/bodeguero',(req, res)=> {
  res.render('bodeguero');
})

router.get("/login", (req, res)=> {
  res.render("login");
});

router.get("/admin", (req, res)=> {
  res.render("admin");
});

router.use('/resources', express.static('public'));
router.use('/resources', express.static(__dirname + '/public'));
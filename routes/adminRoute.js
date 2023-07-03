const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });
const connection = require('./database/db.js');

router.get('/', (req, res)=>{
    res.render('admin/indexAdmin')
})

router.get('/crear-usuario', (req, res)=>{
    res.render('admin/crearusuario')
})

router.get('/listar-usuario', function(req, res) {
    connection.query('SELECT * FROM empleado', function(error, empleado) {
      if (error) {
        res.render('error', { message: 'Error al cargar los productos' });
      } else {
        res.render('/admin/listarUsuario', { empleado: empleado });
      }
    });
  });

router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;
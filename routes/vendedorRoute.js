const express = require('express');
const router = express.Router()

const axios = require('axios');

router.get('/', (req, res)=>{
    res.render('vendedor/indexVendedor')
})

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
  
  router.get('/productos', (req, res) => {
    obtenerProductos()
      .then((productos) => {
        res.render('vendedor/productos', { productos });
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
  router.get('/pagos', (req, res) => {
    obtenerPagos()
      .then((compras) => {
        res.render('vendedor/pagosvendedor', { compras });
      })
      .catch((error) => {
        res.render('error', { error });
      });
  });
  
router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;
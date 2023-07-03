const express = require('express');
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('contador/indexContador')
})
router.get('/pedidos-aceptados',(req, res)=>{
    res.render('contador/pedidosAceptados')
})
router.get('/pedidos-entregados',(req, res)=>{
    res.render('contador/pedidosEntregados')
})
router.get('/pedidos-pendientes', (req, res) => {
    const query = "SELECT `id`, `fecha`, `total`, `estado`, `NombreCliente` || ' ' || `ApellidoCliente` AS `NombreCompleto`, `CorreoElectronico`, `Telefono`, `tipoPago`, CASE `estado` WHEN 1 THEN 'Aceptado' WHEN 2 THEN 'Entregado' WHEN 3 THEN 'Rechazado' ELSE 'Pendiente' END AS `Estado` FROM `compra` WHERE estado = 0";
    
    connection.query(query, (error, results) => {
        if (error) throw error;
        
        res.render('contador/pedidosPendientes', { compras: results });
    });
});

router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;
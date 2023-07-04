const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    axios
      .get("http://localhost:3001/api/pedidos-totales")
      .then((response) => {
        res.render("contador/indexContador", { response: response.data });
      })
      .catch((error) => {
        console.error(error);
        res.render("contador/indexContador", {
          error: "Error al obtener los pedidos",
        });
      });
  });
  
router.get("/pedidos-aceptados", (req, res) => {
  axios
    .get("http://localhost:3001/api/pedidos-aceptados")
    .then((response) => {
      res.render("contador/pedidosAceptados", { response: response.data });
    })
    .catch((error) => {
      // Manejar el error
      console.error(error);
      res.render("contador/pedidosAceptados", {
        error: "Error al obtener los pedidos pendientes",
      });
    });
});
router.get("/pedidos-entregados", (req, res) => {
  axios
    .get("http://localhost:3001/api/pedidos-entregados")
    .then((response) => {
      res.render("contador/pedidosEntregados", { response: response.data });
    })
    .catch((error) => {
      console.error(error);

      res.render("contador/pedidosEntregados", {
        error: "Error al obtener los pedidos pendientes",
      });
    });
});
router.get("/pedidos-pendientes", (req, res) => {
  axios
    .get("http://localhost:3001/api/pedidos-pendientes")
    .then((response) => {
      res.render("contador/pedidosPendientes", { response: response.data });
    })
    .catch((error) => {
      console.error(error);
      res.render("contador/pedidosPendientes", {
        error: "Error al obtener los pedidos pendientes",
      });
    });
});

router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;

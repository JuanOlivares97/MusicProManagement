const express = require('express')
const app = express()
const port = 3001;
const session = require('express-session');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

//moment para hacer filtro por fecha
const moment = require('moment');
const nodemailer = require('nodemailer');

//Motor de vistas
app.set('view engine', 'ejs')

//Rutas
const contadorRoutes = require('./routes/contadorRoute.js')
const bodegueroRoutes = require('./routes/bodegueroRoute.js')
const vendedorRoutes = require('./routes/vendedorRoute.js')
const adminRoutes = require('./routes/adminRoute.js')

//database

dotenv.config({ path: './env/.env' });
const connection = require('./database/db');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Ruta para manejar las rutas de los distintos usuarios
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
          res.redirect('vendedor/',);
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
//PERFIL VENDEDOR
// Ruta para obtener pagos
app.get('/pagosvendedor', (req, res) => {
  obtenerPagos()
    .then((compras) => {
      res.render('vendedor/pagosvendedor', { compras });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

app.get('/enviar-pedido', function (req, res) {
  connection.query('SELECT * FROM detalle_compra WHERE `despacho` = 1', function (error, pedidos) {
    if (error) {
      res.render('error', { message: 'Error al cargar los pedidos' });
    } else {
      res.render('vendedor/pedidos', { pedidos: pedidos });
    }
  });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jua.olivares97@gmail.com', 
    pass: 'kzcdporiudsjjukn' 
  }
});
// Ruta principal para enviar el correo electrónico
app.get('/enviar-correo/:id', (req, res) => {
  const id = req.params.id;

  // Obtén el correo del usuario desde la base de datos
  const query = 'SELECT c.CorreoElectronico FROM `detalle_compra`d JOIN compra c ON c.id = d.compra_id WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el correo del usuario:', err);
      res.send('Error al obtener el correo del usuario');
    } else {
      if (results.length > 0) {
        const correo = results[0].correo;

        // Configura los detalles del mensaje
        const mensaje = {
          from: 'cat.lazo@duocuc.cl',
          to: correo,
          subject: 'hola',
          text: 'k tal?'
        };

        // Envía el mensaje de correo electrónico
        transporter.sendMail(mensaje, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.send('Error al enviar el correo electrónico');
          } else {
            console.log('Correo electrónico enviado:', info.response);
            res.send('Correo electrónico enviado exitosamente');
          }
        });
      } else {
        res.redirect('/enviar-pedido')
      }
    }
  });
});

//</PERFIL VENDEDOR>

//Perfil contador
app.get('/api/pedidos-pendientes', (req, res) => {
  const query = "SELECT `id`, DATE_FORMAT(fecha, '%d %b %Y') as fecha, `total`, `NombreCliente`, `ApellidoCliente`, `CorreoElectronico`, `Telefono`, `tipoPago`, CASE `estado` WHEN 1 THEN 'Aceptado' WHEN 2 THEN 'Entregado' WHEN 3 THEN 'Rechazado' ELSE 'Pendiente' END AS `Estado` FROM `compra` WHERE estado = 0 and tipoPago = 'transferencia'";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/pedidos-aceptados', (req, res) => {
  const query = "SELECT `id`, DATE_FORMAT(fecha, '%d %b %Y') as fecha, `total`, `NombreCliente`, `ApellidoCliente`, `CorreoElectronico`, `Telefono`, `tipoPago`, CASE `estado` WHEN 1 THEN 'Aceptado' WHEN 2 THEN 'Entregado' WHEN 3 THEN 'Rechazado' ELSE 'Pendiente' END AS `Estado` FROM `compra` WHERE estado = 1";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/pedidos-entregados', (req, res) => {
  const query = "SELECT `id`, DATE_FORMAT(fecha, '%d %b %Y') as fecha, `total`, `NombreCliente`, `ApellidoCliente`, `CorreoElectronico`, `Telefono`, `tipoPago`, CASE `estado` WHEN 1 THEN 'Aceptado' WHEN 2 THEN 'Entregado' WHEN 3 THEN 'Rechazado' ELSE 'Pendiente' END AS `Estado` FROM `compra` WHERE estado = 2";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/pedidos-totales', (req, res) => {
  const query = "SELECT CASE WHEN estado = 0 then COUNT(id) else 0 end Pendiente, CASE WHEN estado = 1 then COUNT(id) else 0 end Aceptado, CASE WHEN estado = 2 then COUNT(id) else 0 END Entregado, CASE WHEN estado = 3 then COUNT(id) else 0 end Rechazado FROM `compra` ";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/pedidos-totales-graficos-transferencias', (req, res) => {
  const query = "SELECT c.Month AS Mes, CASE WHEN estado = 0 then COUNT(id) else 0 end Pendiente, CASE WHEN estado = 1 then COUNT(id) else 0 end Aceptado, CASE WHEN estado = 2 then COUNT(id) else 0 END Entregado, CASE WHEN estado = 3 then COUNT(id) else 0 end Rechazado FROM ( SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 ) AS c LEFT JOIN compra ON c.Month = MONTH(compra.fecha) AND compra.tipoPago = 'transferencia' GROUP BY c.Month ";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/pedidos-totales-graficos-webpay', (req, res) => {
  const query = "SELECT c.Month AS Mes, CASE WHEN estado = 0 then COUNT(id) else 0 end Pendiente, CASE WHEN estado = 1 then COUNT(id) else 0 end Aceptado, CASE WHEN estado = 2 then COUNT(id) else 0 END Entregado, CASE WHEN estado = 3 then COUNT(id) else 0 end Rechazado FROM ( SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 ) AS c LEFT JOIN compra ON c.Month = MONTH(compra.fecha) AND compra.tipoPago = 'WebPay' GROUP BY c.Month ";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/api/detalle-pedido/:id', (req, res) => {
  const compraId = req.params.id;
  const query = "SELECT CONCAT(u.nombre, ' ', u.apellido) AS NombreCompleto, u.rut, u.direccion, DATE_FORMAT(fecha, '%d %b %Y') as fecha, dc.producto_nombre, dc.cantidad, dc.precio, c.total FROM compra c INNER JOIN detalle_compra dc ON c.id = dc.compra_id INNER JOIN usuarios u ON c.cliente_id = u.id WHERE dc.compra_id = ?";
  connection.query(query, [compraId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/api/actualizarestado/:id', (req, res) => {
  const compraId = req.params.id;
  const query = "UPDATE `compra` SET `estado`= 1 WHERE id = ?";
  connection.query(query, [compraId], (error, results) => {
    if (error) {
      throw error;
    }
    // Enviar la respuesta JSON al cliente
    res.json(results);
  });
});

app.post('/api/actualizarestado/:id', (req, res) => {
  const compraId = req.params.id;
  // Realizar la redirección
  res.redirect('/contador/pedidos-pendientes');
});
//Fin perfil Contador


//Perfil administrador
// Crear un empleado
app.post('/empleado', (req, res) => {
  const { nombre, apellido, correo, user, pass, tipoUsuario } = req.body;
  connection.query('INSERT INTO empleado (nombre, apellido, correo, user, pass, tipoUsuario) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, correo, user, pass, tipoUsuario], (err, result) => {
    if (err) {
      console.error('Error al crear el empleado: ', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.status(201).send('Empleado creado exitosamente');
  });
});
//Listar empleado
app.get('/listar-usuario', function (req, res) {
  connection.query('SELECT * FROM empleado', function (error, empleado) {
    if (error) {
      res.render('error', { message: 'Error al cargar los productos' });
    } else {
      res.render('admin/listarUsuario', { empleados: empleado });
    }
  });
});
// Eliminar un empleado
app.delete('/eliminar-empleados/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM empleado WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el empleado: ', err);
      res.status(500).send('Error del servidor');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Empleado no encontrado');
    } else {
      res.send('Empleado eliminado exitosamente');
    }
  });
});

// Crear un empleado
app.post('/empleado', (req, res) => {
  const { nombre, apellido, correo, user, pass, tipoUsuario } = req.body;
  connection.query('INSERT INTO empleado (nombre, apellido, correo, user, pass, tipoUsuario) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, correo, user, pass, tipoUsuario], (err, result) => {
    if (err) {
      console.error('Error al crear el empleado: ', err);
      res.status(500).send('Error del servidor');
      return;
    }
    res.status(201).send('Empleado creado exitosamente');
  });
});

// Ruta para mostrar el formulario de edición de empleado
app.get('/editar-usuario1/:id', (req, res) => {
  const empleadoId = req.params.id;
  const query = 'SELECT * FROM empleado WHERE id = ?';

  connection.query(query, [empleadoId], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del empleado: ', error);
      res.render('/error', { error });
    } else {
      // Renderiza el formulario de edición con los datos del empleado
      res.render('admin/editarUsuario', { empleado : results});
    }
  });
});

app.post('/editar-usuario2/:id', (req, res) => {
  const empleadoId = req.params.id;
  const { nombre, apellido, correo, user, pass, tipoUsuario } = req.body;
  // Realiza una consulta de actualización en la base de datos para actualizar los datos del empleado
  const query = 'UPDATE empleado SET nombre = ?, apellido = ?, correo = ?, user = ?, pass = ?, tipoUsuario = ? WHERE id = ?';

  connection.query(query, [nombre, apellido, correo, user, pass, tipoUsuario, empleadoId], (error, results) => {
    if (error) {
      console.error('Error al actualizar los datos del empleado: ', error);
      res.render('error', { error });
    } else {
      // Redirige a una página de éxito o muestra un mensaje de éxito
      res.redirect('/listar-usuario');
    }
  });
});
//</ ADMINISTRADOR>

////Bodeguero
app.get('/despachar-pedido', function (req, res) {
  const fechaFiltro = req.query.fecha; // Obtén la fecha de filtro de los parámetros de consulta (por ejemplo, ?fecha=2023-07-05)

  connection.query('SELECT * FROM `detalle_compra` d JOIN `compra` c ON c.id = d.compra_id WHERE d.despacho = 0', function (error, compras) {
    if (error) {
      res.render('error', { message: 'Error al cargar las compras' });
    } else {
      // Filtrar las compras por fecha utilizando moment.js
      const comprasFiltradas = compras.filter(function(compra) {
        const fechaCompra = moment(compra.fecha, 'YYYY-MM-DD');
        const fechaFiltroMoment = moment(fechaFiltro, 'YYYY-MM-DD');

        return fechaCompra.isSame(fechaFiltroMoment, 'day');
      });

      res.render('bodeguero/cancelar', { compras: comprasFiltradas, fechaFiltro: fechaFiltro });
    }
  });
});

app.post('/actualizar-despacho/:id', (req, res) => {
  const id = req.params.id;
  // Realiza una consulta de actualización para cambiar el valor de "despacho" de 0 a 1.
  const query = "UPDATE `detalle_compra` SET `despacho` = 1 WHERE `id` = ?";
  connection.query(query, [id], (error, results) => {
    if (error) throw error;
    res.redirect("/despachar-pedido"); 
  });
});
//</ Bodeguero>
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
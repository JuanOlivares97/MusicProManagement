const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jua.olivares97@gmail.com', 
    pass: 'kzcdporiudsjjukn' 
  }
});

const mailOptions = {
    from: 'jua.olivares97@gmail.com', 
    to: correo, 
    subject: '!Pedido Realizado!', 
    html: `
    <h2>Detalles de Transferencia Bancaria</h2>
    <p>A continuación se muestran los detalles de la transferencia bancaria a la cuenta corriente de Falabella:</p>
    <table>
      <tr>
        <th>Banco Destinatario:</th>
        <td>Banco Falabella</td>
      </tr>
      <tr>
        <th>Número de Cuenta:</th>
        <td>1234567890</td>
      </tr>
      <tr>
        <th>Rut del Titular:</th>
        <td>12.345.678-9</td>
      </tr>
      <tr>
        <th>Nombre del Titular:</th>
        <td>Nombre del Titular</td>
      </tr>
      <tr>
        <th>Monto a Transferir:</th>
        <td>$${totalCompra}</td>
      </tr>
    </table>
    <p>Por favor, asegúrate de realizar la transferencia por el monto exacto y verificar los datos antes de realizar la transacción.</p>
    <p>¡Gracias por tu atención!</p>
     ` 
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
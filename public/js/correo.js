function enviarCorreo(correo) {
    fetch('/enviar-correo/' + correo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error al enviar el correo electrónico');
        }
      })
      .then(message => {
        alert(message);
      })
      .catch(error => {
        console.error('Error al enviar el correo electrónico:', error);
        alert('Error al enviar el correo electrónico');
      });
  }
function obtenerDetallePedido(compraId) {
    fetch(`/api/detalle-pedido/${compraId}`)
      .then(response => response.json())
      .then(data => {
        // Llenar los datos en el HTML
        document.getElementById('cliente').textContent = data[0].NombreCompleto;
        document.getElementById('rut').textContent = data[0].rut;
        document.getElementById('direccion').textContent = data[0].direccion;
        document.getElementById('fecha').textContent = data[0].fecha;
  
        const detallesPedido = document.getElementById('items-table-body');
        let total = 0;
  
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.producto_nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio}</td>
            <td>$${item.cantidad * item.precio}</td>
          `;
          detallesPedido.appendChild(row);
          total += item.cantidad * item.precio;
        });
  
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
      })
      .catch(error => {
        // Manejar el error
        console.error(error);
      });
  }

  function limpiarDetalles() {
    // Limpiar los elementos de la información anterior
    document.getElementById('cliente').innerText = '';
    document.getElementById('rut').innerText = '';
    document.getElementById('direccion').innerText = '';
    document.getElementById('fecha').innerText = '';
    
    // Limpiar la tabla de items
    var itemsTableBody = document.getElementById('items-table-body');
    while (itemsTableBody.firstChild) {
      itemsTableBody.removeChild(itemsTableBody.firstChild);
    }
    
    // Limpiar el total
    document.getElementById('total').innerText = '';
  }

  function confirmarActualizacionCompra(compraId) {
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Estás seguro de que deseas actualizar el estado de la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarEstadoCompra(compraId);
      }
    });
  }
  
  function actualizarEstadoCompra(compraId) {
    fetch(`/api/actualizarestado/${compraId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        // Manejar el error
        console.error(error);
      });
  }
  
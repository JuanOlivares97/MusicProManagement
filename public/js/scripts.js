// Obtener referencia a los elementos HTML
const productList = document.getElementById('productList');
const orderList = document.getElementById('orderList');

// Obtener productos disponibles del servidor
axios.get('/vendedor')
  .then(response => {
    // Mostrar los productos en la página
    const productos = response.data;
    productos.forEach(producto => {
      const productItem = document.createElement('div');
      productItem.innerText = `Nombre: ${producto.descripcion}, Precio: ${producto.precio}`;
      productList.appendChild(productItem);
    });
  })
  .catch(error => {
    console.error('Error al obtener productos:', error);
  });

// Obtener pedidos y pagos del servidor
axios.get('/vendedor')
  .then(response => {
    // Mostrar los pedidos y pagos en la página
    const orders = response.data;
    orders.forEach(order => {
      const orderItem = document.createElement('div');
      orderItem.innerText = `ID Pedido: ${order.id}, Cantidad: ${order.cantidad}`;
      orderList.appendChild(orderItem);
    });
  })
  .catch(error => {
    console.error('Error al obtener pedidos:', error);
  });

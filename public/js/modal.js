// Obtén la referencia al modal y a los botones
const modal = document.getElementById("modal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
let deleteId = null;

function showModal(id) {
  deleteId = id;
  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

const deleteLinks = document.getElementsByClassName("delete-link");
for (let i = 0; i < deleteLinks.length; i++) {
  deleteLinks[i].onclick = function(e) {
    e.preventDefault();
    const id = this.getAttribute("data-id");
    showModal(id);
  };
}
cancelBtn.onclick = hideModal;

confirmBtn.onclick = function() {
  if (deleteId) {
    fetch(`/eliminar-empleados/${deleteId}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error en la eliminación del empleado");
        }
      })
      .then(responseText => {
        console.log(responseText); 
        hideModal();
        window.location.href = "/listar-usuario";  
    })
      .catch(error => {
        console.error("Error en la eliminación del empleado: ", error);
        hideModal();
      });
  }
};

function mostrarMensajeExito() {
  Swal.fire({
    title: 'Empleado creado con éxito',
    icon: 'success',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
}

function actualizarDespacho(id) {
  // Realiza una solicitud POST a la ruta para actualizar el despacho.
  fetch(`/actualizar-despacho/${id}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); 
      window.location.href = "/despachar-pedido";
    })
    .catch(error => {
      console.error('Error al actualizar el despacho:', error);
    });
}
function actualizarDespacho(id) {
  // Realiza una solicitud POST a la ruta para actualizar el despacho.
  fetch(`/actualizar-despacho/${id}`, { method: 'POST' })
    .then(response => {
      if (response.ok) {
        console.log("El despacho se ha actualizado correctamente.");
        window.location.href = "/despachar-pedido";
        const fila = document.getElementById(`fila-${id}`);
        fila.style.display = 'none';
      } else {
        throw new Error('Error al actualizar el despacho.');
      }
    })
    .catch(error => {
      console.error('Error al actualizar el despacho:', error);
    });
}

function eliminarFila(id) {
  // Eliminar la fila correspondiente
  const fila = document.getElementById(`fila-${id}`);
  fila.parentNode.removeChild(fila);
}
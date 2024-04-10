//  API de localStorage
// localStorage.setItem('tarea01', 'control')
localStorage.setItem('tarea02', 'fiesta loca')
// let tarea= localStorage.getItem('tarea01')
let tarea= localStorage.getItem('tarea02')
console.log(tarea)

/////////////////////////////////////////////////////////////////////////////////////

console.log(localStorage.length)

let tareas = localStorage
for (let i = 0; i < tareas.length; i++) {
  let key = localStorage.key(i) // Clave donde esta guardada la info del Est.
  console.log(key)
  tarea = localStorage.getItem(key) // Info del Est. en formato JSON
  console.log(tarea)
}

localStorage.clear();


document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener la fecha y hora actual
  function obtenerFechaHoraActual() {
    const ahora = new Date();
    return ahora.toLocaleString();
  }

  // Función para agregar una nueva nota
  function agregarNota() {
    const notaInput = document.getElementById('nota');
    const notaTexto = notaInput.value.trim();

    if (notaTexto !== '') {
      // Obtener fecha y hora actual
      const fechaHora = obtenerFechaHoraActual();
      // Crear identificador único para la nota (usando la fecha y hora)
      const idNota = Date.now().toString();

      // Guardar la nota en localStorage
      localStorage.setItem(idNota, JSON.stringify({ texto: notaTexto, fecha: fechaHora }));

      // Agregar la nota a la lista
      const listaNotas = document.getElementById('listaNotas');
      const nuevaNota = document.createElement('li');
      nuevaNota.textContent = `${fechaHora}: ${notaTexto}`;
      listaNotas.appendChild(nuevaNota);

      // Limpiar el campo de texto
      notaInput.value = '';
    }
  }

  // Función para mostrar las notas almacenadas al cargar la página
  function mostrarNotasAlmacenadas() {
    const listaNotas = document.getElementById('listaNotas');

    if (localStorage.length === 0) {
      listaNotas.innerHTML = '<li>No hay notas almacenadas.</li>';
    } else {
      listaNotas.innerHTML = '';
      for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        const { texto, fecha } = JSON.parse(localStorage.getItem(clave));
        const nota = document.createElement('li');
        nota.textContent = `${fecha}: ${texto}`;
        listaNotas.appendChild(nota);
      }
    }
  }

  // Mostrar fecha y hora actual en el campo correspondiente
  document.getElementById('fecha').value = obtenerFechaHoraActual();

  // Mostrar las notas almacenadas al cargar la página
  mostrarNotasAlmacenadas();

  // Agregar evento al botón de agregar nota
  document.getElementById('agregarNota').addEventListener('click', agregarNota);
});
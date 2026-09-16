// Seleccionar los elementos del DOM
const input = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const lista = document.getElementById('lista');

// Función para agregar un nuevo elemento a la lista
function agregarElemento() {
    const texto = input.value.trim();

    if (texto !== '') {
        // Crear un nuevo elemento 'li'
        const li = document.createElement('li');
        li.classList.add('elemento');

        // Agregar el texto al li
        const textoNodo = document.createTextNode(texto);
        li.appendChild(textoNodo);

        // Crear el botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            li.remove();
        });

        // Añadir el botón al li y el li a la lista
        li.appendChild(botonEliminar);
        lista.appendChild(li);

        // Limpiar el campo de texto
        input.value = '';
    } else {
        alert('Escribe algo para agregar a la lista.');
    }
}

// Asignar la función al botón de agregar
botonAgregar.addEventListener('click', agregarElemento);
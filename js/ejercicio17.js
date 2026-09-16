const inputTarea = document.getElementById('input-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareasUI = document.getElementById('lista-tareas');
const formulario=document.getElementById('formulario-tareas')

// CLOSURE: Encapsula el acceso y modificación de datos del Local Storage
function crearGestorTareas() {
    const CLAVE_STORAGE = 'mis_tareas';

    // Función interna: lee del storage y convierte de JSON a arreglo
    function obtenerTareas() {
        const datos = localStorage.getItem(CLAVE_STORAGE);
        return datos ? JSON.parse(datos) : [];
    }

    // Función interna: guarda el arreglo convirtiéndolo a JSON
    function guardarEnStorage(tareas) {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
    }

    // Retornamos los métodos públicos que recuerdan su entorno léxico (Closure)
    return {
        obtener: function() {
            return obtenerTareas();
        },
        agregar: function(texto) {
            const tareas = obtenerTareas();
            tareas.push(texto);
            guardarEnStorage(tareas);
        },
        eliminar: function(indice) {
            const tareas = obtenerTareas();
            tareas.splice(indice, 1);
            guardarEnStorage(tareas);
        }
    };
}

// Instanciamos el closure
const gestor = crearGestorTareas();

// Función para pintar las tareas en el HTML
function renderizarTareas() {
    listaTareasUI.innerHTML = '';
    const tareas = gestor.obtener();

    if (tareas.length === 0) {
        listaTareasUI.innerHTML = '<li style="color: #888;">No hay tareas pendientes.</li>';
        return;
    }

    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.margin = '8px 0';

        const span = document.createElement('span');
        span.textContent = tarea;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.type = 'button';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.style.cursor = 'pointer';

        // Evento de eliminar con confirmación de SweetAlert2
        botonEliminar.addEventListener('click', () => {
            Swal.fire({
                title: '¿Deseas eliminar esta tarea?',
                text: `Se eliminará: "${tarea}"`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    gestor.eliminar(index);
                    renderizarTareas();
                    Swal.fire('¡Eliminada!', 'La tarea fue eliminada con éxito.', 'success');
                }
            });
        });

        li.appendChild(span);
        li.appendChild(botonEliminar);
        listaTareasUI.appendChild(li);
    });
}

// Evento para agregar nueva tarea
function agregarNuevaTarea() {
    const texto = inputTarea.value.trim();

    if (texto === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor escribe una tarea antes de agregarla.'
        });
        return;
    }

    gestor.agregar(texto);
    inputTarea.value = '';
    inputTarea.focus();
    renderizarTareas();
}

// Asignación de eventos y carga inicial
btnAgregar.addEventListener('click', agregarNuevaTarea);

// Permite presionar Enter en el input para registrar
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); 
    agregarNuevaTarea();
});

// Renderizar las tareas almacenadas al abrir o recargar la página
renderizarTareas();
const inputNombre = document.getElementById('nombre');
const inputCalificacion = document.getElementById('calificacion');
const botonAgregar = document.getElementById('boton-agregar');
const botonCalcular = document.getElementById('boton-calcular');

const resPromedio = document.getElementById('resultado-promedio');
const resMayor = document.getElementById('resultado-mayor');
const resMenor = document.getElementById('resultado-menor');

let listaEstudiantes = [];

function agregarEstudiante() {
    const nombre = inputNombre.value.trim();
    const calificacionTexto = inputCalificacion.value.trim();

    if (nombre === '' || calificacionTexto === '') {
        alert('Por favor ingresa tanto el nombre como la calificación.');
        return;
    }

    const calificacion = parseFloat(calificacionTexto);

    if (isNaN(calificacion) || calificacion>100 ||calificacion <0) {
        alert('Ingresa una calificación válida.');
        return;
    }

    // 3. Crear el objeto estudiante y agregarlo al arreglo
    const estudiante = {
        nombre: nombre,
        calificacion: calificacion
    };

    listaEstudiantes.push(estudiante);

    inputNombre.value = '';
    inputCalificacion.value = '';
    inputNombre.focus();

    alert(`Estudiante ${estudiante.nombre} agregado con éxito.`);
}

function calcularResultados() {
    if (listaEstudiantes.length === 0) {
        alert('Debes agregar al menos un estudiante antes de calcular.');
        return;
    }

    const sumaTotal = listaEstudiantes.reduce((acumulado, est) => acumulado + est.calificacion, 0);
    const promedio = sumaTotal / listaEstudiantes.length;
    resPromedio.value = Number.isInteger(promedio) ? promedio : promedio.toFixed(2);


    const soloCalificaciones = listaEstudiantes.map(est => est.calificacion);
    const maxCalificacion = Math.max(...soloCalificaciones);
    const minCalificacion = Math.min(...soloCalificaciones);


    const mejorEstudiante = listaEstudiantes.find(est => est.calificacion === maxCalificacion);
    const menorEstudiante = listaEstudiantes.find(est => est.calificacion === minCalificacion);


    resMayor.value = mejorEstudiante.nombre;
    resMenor.value = menorEstudiante.nombre;
}


botonAgregar.addEventListener('click', agregarEstudiante);
botonCalcular.addEventListener('click', calcularResultados);
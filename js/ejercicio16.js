// Referencias a los elementos del DOM
const inputNum1 = document.getElementById('numero1');
const inputNum2 = document.getElementById('numero2');
const inputResultado = document.getElementById('resultado');

const btnSumar = document.getElementById('btn-sumar');
const btnRestar = document.getElementById('btn-restar');
const btnMultiplicar = document.getElementById('btn-multiplicar');
const btnDividir = document.getElementById('btn-dividir');

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => (b !== 0 ? a / b : 'Error: División por cero');

function calcularOperacion(operacion) {
    const val1 = inputNum1.value.trim();
    const val2 = inputNum2.value.trim();

    if (val1 === '' || val2 === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor ingresa ambos números antes de continuar.'
        });
        inputResultado.value = '';
        return;
    }

    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);

    if (isNaN(n1) || isNaN(n2)) {
        Swal.fire({
            icon: 'error',
            title: 'Datos no válidos',
            text: 'Asegúrate de ingresar únicamente números.'
        });
        inputResultado.value = '';
        return;
    }

    if (operacion === 'dividir' && n2 === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Operación no permitida',
            text: 'No es posible dividir un número entre cero.'
        });
        inputResultado.value = 'Error: División por cero';
        return;
    }

    let resultadoCalculado = 0;

    switch (operacion) {
        case 'sumar':
            resultadoCalculado = sumar(n1, n2);
            break;
        case 'restar':
            resultadoCalculado = restar(n1, n2);
            break;
        case 'multiplicar':
            resultadoCalculado = multiplicar(n1, n2);
            break;
        case 'dividir':
            resultadoCalculado = dividir(n1, n2);
            break;
    }

    inputResultado.value = Number.isInteger(resultadoCalculado) 
        ? resultadoCalculado 
        : resultadoCalculado.toFixed(2);
}

btnSumar.addEventListener('click', () => calcularOperacion('sumar'));
btnRestar.addEventListener('click', () => calcularOperacion('restar'));
btnMultiplicar.addEventListener('click', () => calcularOperacion('multiplicar'));
btnDividir.addEventListener('click', () => calcularOperacion('dividir'));
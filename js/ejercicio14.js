const numerosini=document.getElementById('arreglo');
const botoncalcular=document.getElementById('boton-calcular');
const resultadomay=document.getElementById('resultado-mayor');
const resultadomen=document.getElementById('resultado-menor');
const resultadopromedio=document.getElementById('resultado-promedio');

function calcular() {
  const rawValue = numerosini.value.trim();

  if (!rawValue) {
    resultadomay.value = 'Vacío';
    resultadomen.value = 'Vacío';
    resultadopromedio.value = 'Vacío';
    return;
  }

  const numeros = rawValue
    .split(',')
    .map(item => parseFloat(item.trim()))
    .filter(num => !isNaN(num));

  if (numeros.length === 0) {
    resultadomay.value = 'Inválido';
    resultadomen.value = 'Inválido';
    resultadopromedio.value = 'Inválido';
    return;
  }

  const maximo = Math.max(...numeros);
  const min = Math.min(...numeros);

  const suma = numeros.reduce((acc, valor) => acc + valor, 0);
  const promedio = suma / numeros.length;

  resultadomay.value = maximo;
  resultadomen.value = min;
  resultadopromedio.value = Number.isInteger(promedio) ? promedio : promedio.toFixed(2);
}
botoncalcular.addEventListener('click', calcular);
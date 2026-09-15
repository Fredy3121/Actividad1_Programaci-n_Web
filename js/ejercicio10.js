const numero1= document.getElementById('numero');
const botonconvertir=document.getElementById('boton-convertir');
const resultado=document.getElementById('resultado');


function  conversion(){
    const valor= numero1.value.trim();
    if (valor === '') {
    resultado.value = 'Ingresa un valor valido';
    return;
  }

    const valorcelcius = parseFloat(valor);
  if (isNaN(valorcelcius)) {
    resultado.value = 'Valor inválido';
    return;
  }

    const faren = (valorcelcius * 9 / 5) + 32;
    const formattedResult = Number.isInteger(faren) 
    resultado.value = formattedResult;
  resultado.value = Number.isInteger(faren) ? faren : faren.toFixed(2);
}

botonconvertir.addEventListener('click', conversion);
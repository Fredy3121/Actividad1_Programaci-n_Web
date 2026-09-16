const kilometros=document.getElementById('kilometros');
const botonconvertir=document.getElementById('boton-convertir');
const resultado=document.getElementById('millas');

function conversion(){
    const valor=kilometros.value.trim();
    if(valor==''){
        resultado.value = 'Ingresa un valor valido';
        return;
    }
    const valorkill= parseFloat(valor);
    if(isNaN(parseFloat(valorkill))){
        resultado.value='valor invalido';
        return;
    }

    const mill= valorkill * 0.621371;
    const formatoresul= Number.isInteger(mill);
    resultado.value= formatoresul;
    resultado.value=Number.isInteger(mill) ? mill : mill.toFixed(6);
}

botonconvertir.addEventListener('click', conversion);
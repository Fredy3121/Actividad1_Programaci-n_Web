const kilometros=document.getElementById('edad');
const botonverificar=document.getElementById('boton-verificar');
const resultado=document.getElementById('resultado-verificar');

function verificar(){
    const edad=kilometros.value.trim();
    if(edad==''){
        resultado.value = 'Ingresa una edad valida';
        return;
    }
    const edadvalor= parseInt(edad);
    if(isNaN(parseInt(edadvalor))){
        resultado.value='edad invalida';
        return;
    }

    if(edadvalor>=18 && edadvalor<100){
        resultado.value='Puedes votar';
        return;
    }
    else if(edadvalor<0 || edadvalor>100){
        resultado.value='Edad no valida';
        return;
    }
    else{
        resultado.value='No puedes votar';
        return;
    }
}

botonverificar.addEventListener('click', verificar);
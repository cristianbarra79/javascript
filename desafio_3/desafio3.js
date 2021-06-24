const primerNumero = parseInt(prompt("Ingrese el primer numero"));

let boleano = true
let operacion = ""
let resultado = 0;

//uso de do ya que tiene que entrar por lo menos una vez al bucle
do{
    operacion = prompt("Ingrese la operacion(suma, resta, multiplicacion, division)");
    if (operacion == "suma" || operacion == "resta" || operacion == "division" || operacion == "multiplicacion" ){
        boleano = false;
    }
    else{
        alert("ingrese correctamente la operacion")
    }
    
}while(boleano)

const segundoNumero = parseInt(prompt("Ingrese el segundo numero"));


switch(operacion){
    case "suma":
        resultado = primerNumero + segundoNumero;
        break;
    case "resta":
        resultado = primerNumero - segundoNumero;
        break;
    case "multiplicacion":
        resultado = primerNumero * segundoNumero;
        break;
    case "division":
        resultado = primerNumero / segundoNumero;
        break;
}


console.log("El resultado es: " + resultado);
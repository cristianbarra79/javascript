const anio = parseInt(prompt("Ingrese año de nacimiento"));
if (anio > 100){
    console.log("Tu edad este año es de: " + (2021 - anio));
}
else{
    const diferencia = 100 - anio
    console.log("Tu edad este año es de: " + (diferencia + 21));
}
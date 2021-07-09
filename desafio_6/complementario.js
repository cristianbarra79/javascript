class producto{
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseInt(precio);        
    }    
}

const productos = [];
booleano = true;
alert("Carga de datos");
do {
    nombre = prompt("Ingrese nombre del producto:");
    precio = prompt("Ingrese precio del producto:");    
    productos.push(new producto(nombre, precio));
    respuesta = prompt("Si no desea cargar mas datos presiones N")    
    if (respuesta == "n" || respuesta == "N"){        
        booleano = false;        
    }
} while (booleano);

orden = prompt("Desea ordenar por precio creciente o decreciente").toUpperCase();

if (orden == "DECRECIENTE") {
    productos.sort((item1,item2) => {
        return item2.precio - item1.precio;
    });
} else {
    productos.sort((item1,item2) => {
        return item1.precio - item2.precio;
    });
    
}

console.log(productos);

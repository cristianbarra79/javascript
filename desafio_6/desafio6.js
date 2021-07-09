class producto{
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);     
    }

    vender(cantidad){
        this.stock -= parseInt(cantidad);
    }
}

const productos = [];
booleano = true;


alert("Carga de datos");
do {
    nombre = prompt("Ingrese nombre del producto:");
    precio = prompt("Ingrese precio del producto:");
    stock =  prompt("Ingrese stock del producto:");
    productos.push(new producto(nombre, precio, stock));

    respuesta = prompt("Si no desea cargar mas datos presiones N")    
    if (respuesta == "n" || respuesta == "N"){        
        booleano = false;        
    }
} while (booleano);

console.log(productos);

alert("venta");
decision = true;
let encontrado = "";

do {
    venta = prompt("Cual producto desea vender");
    encontrado = productos.find(elemento => elemento.nombre == venta);
    if (encontrado == undefined) {
        alert("No ingreso un producto valido")
    } else {
        cantidad = prompt("Por cuanta cantidad?");
        encontrado.vender(cantidad)
        continuar = prompt("Si desea no seguir vendiendo ingrese N")
        if (continuar == "n" || continuar == "N") {
            decision = false;
        }
    }
} while (decision);

console.log(productos);
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

nombre = prompt("Ingrese nombre del producto:");
precio = prompt("Ingrese precio del producto:");
stock =  prompt("Ingrese stock del producto:");

const producto1 = new producto(nombre, precio, stock);

venta = prompt("Desea vender " + producto1.nombre + "? Ingrese S en caso de querer vender");

if (venta == "s" || venta == "S"){
    producto1.vender(prompt("ingrese la cantidad a vender"))
}
console.log(producto1);
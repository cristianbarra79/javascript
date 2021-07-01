function sumatoria(precio,cantidad) {
    total = parseInt(precio) * parseInt(cantidad)    
    return total    
}

let pedido = "";
let producto = "";
let precio = "";
let cantidad = "";
let subtotal = "";

alert("Bienvenido al carrito de compras")
producto = prompt("Ingrese el nombre del producto")
precio = prompt("Ingrese el precio del producto")
cantidad = prompt("Ingrese la cantidad")    
subtotal = sumatoria(precio, cantidad)
pedido = "Su pedido es:\n" + producto + " $" + subtotal;
alert(pedido)
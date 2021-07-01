function sumatoria(precio, cantidad) {
    totalizado = parseInt(precio) * parseInt(cantidad)    
    return totalizado
}

function pedidos(pedido, producto, subtotal) {
    if (pedido.length > 0){
        return pedido + "\n" + "    " +producto + ": $" + subtotal;
    }
    else{        
        return "    " + producto + ": $" + subtotal;
    }    
}



function totales(subtotal, total) {
    return parseInt(total) + parseInt(subtotal)  
}



let producto = "";
let precio = 0;
let cantidad = 0;
let subtotal = 0;
let pedido = "";
let total = 0;
let boleano = true

alert("Bienvenido al carrito de compras")

while (boleano) {
    
    producto = prompt("Ingrese el nombre del producto")
    precio = prompt("Ingrese el precio del producto")
    cantidad = prompt("Ingrese la cantidad")
    subtotal = sumatoria(precio, cantidad)
    
    pedido = pedidos(pedido, producto, subtotal)
    
    
    total = totales(subtotal, total)
    
    salida = prompt("Si desea salir ingrese N, si desea continuar ingrese cualquier tecla")
    if (salida == "n" || salida == "N") {
        boleano = false;
    }

}
alert("Su pedido es:\n" + pedido + "\nCon un total de: $" + total )

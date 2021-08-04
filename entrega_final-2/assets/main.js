class producto{
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);                
    }
}

productos = []
descarga = []

let btnCargar = document.getElementById("carga")
let btnVender = document.getElementById("venta")

let datos = ""
let opciones = ""
let btnEnviar = document.getElementById("enviar");
let btnFinalizar = document.getElementById("finalizar");
let mostrar = document.getElementById("mostrar");
let incrustrar = document.getElementById("tabla");
let selecproduct = document.querySelector("#opciones")
let pedidos = document.querySelector(".pedidos")


function agregar(e) {
    e.preventDefault()
    
    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    let stock = document.getElementById("stock").value
        
    let tabla = document.getElementById("tabla");
    
    id++;
  
    productos.push(new producto(id, nombre, precio, stock));

    localStorage.setItem("productos", JSON.stringify(productos))

    let datos = `
    <tr>
            
        <td>${nombre}</td>
        
        <td>$${precio}</td>
        
        <td>${stock}</td>
            
    </tr>`

    let tr = document.createElement("tr");
    tr.innerHTML = datos
    tabla.appendChild(tr);


    document.getElementById("nombre").value = null;
    document.getElementById("precio").value = null;
    document.getElementById("stock").value = null;
        
    const myNode = document.getElementById("opciones");
    myNode.innerHTML = ''

    document.getElementById("nombre").focus()
    cargaDatos()
}

function finalizar(e) {

    e.preventDefault()

    let cantidad = document.getElementById("cantidad").value    
    let verdura = document.getElementById("seleccion").value

    let pedido = document.createElement("h3")
    pedido.innerHTML = `${productos[verdura-1].nombre} por ${cantidad}: $${productos[verdura-1].precio * cantidad}`
    pedidos.appendChild(pedido)

    document.getElementById("nombre").focus()
}

function cargaDatos() {
    
    opciones = `<option value="1">${productos[0].nombre} </option>`

    for (var i = 1; i < productos.length; i+=1) {

        opciones += `<option value="${i+1}">${productos[i].nombre} </option>`
    }
    
    let select = document.createElement("select")
    select.innerHTML = opciones
    select.setAttribute("class", "form-select");
    select.setAttribute("id", "seleccion");
    selecproduct.appendChild(select);
}


productos.push(new producto(1, "manzana", 20, 50));
productos.push(new producto(2, "banana", 15, 85));
productos.push(new producto(3, "pera", 5, 100));
productos.push(new producto(4, "naranja", 8, 93));
localStorage.setItem("productos", JSON.stringify(productos))
let id = 4


cargaDatos()

document.querySelector(".cargar").style.display = "none"
document.querySelector(".vender").style.display = "none"

btnCargar.addEventListener("click", function(){
    document.querySelector(".cargar").style.display = "block";
    document.querySelector(".vender").style.display = "none"
});

btnVender.addEventListener("click", function(){
    document.querySelector(".vender").style.display = "block"
    document.querySelector(".cargar").style.display = "none";
    document.getElementById("cantidad").focus()
});

btnEnviar.addEventListener("click", agregar);
btnFinalizar.addEventListener("click", finalizar);
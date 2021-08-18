class producto{
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);                
    }
}

class carrito{
    constructor(id, nombre, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = parseInt(cantidad)
    }
}

productos = []
compra = []
descarga = []

let index = 4;
let datos = ""
let opciones = ""

let btnCargar = document.getElementById("carga")
let btnVender = document.getElementById("venta")
let btnEnviar = document.getElementById("enviar");
let btnFinalizar = document.getElementById("finalizar");
let cards = document.querySelector("#cards")

function agregar(e) {
    e.preventDefault()
    let nombre = $("#nombre").val()
    let precio = $("#precio").val()
    let stock = $("#stock").val()    
    productos.push(new producto(index, nombre, precio, stock));

    $("#cards").append(`
    <div id="${index}" class="card" style="width: 18rem; margin: 15px">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn" onclick = "quitar(${index})">x</span>
                <div class="card-body">
                  <h5 class="card-title text-center">${nombre.toUpperCase()}</h5>
                  <p class="card-text">Precio: $${precio}</p>
                  <p class="card-text stock">Stock: ${stock}</p>
                  <a href="#" class="btn btn-primary" onclick = "listado(${index})">Comprar</a>
                </div>
            </div>
    `);

    $("#nombre").val("");
    $("#precio").val("")
    $("#stock").val("")
    $("#nombre").focus()
    index++;
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


function menosCantidad(id) {

    let indexCompra = compra.findIndex(x => x.id == id);
    let indexProducto = productos.findIndex(x => x.id == id);


    productos[indexProducto].stock++;
    $(`#${id} .stock`).text(`Stock: ${productos[indexProducto].stock}`);

    compra[indexCompra].cantidad--;
    $(`#${compra[indexCompra].nombre} input`).val(compra[indexCompra].cantidad);

    $(`#${compra[indexCompra].nombre} span`).text(`$${productos[indexProducto].precio * compra[indexCompra].cantidad}`)

    localStorage.setItem("carrito", JSON.stringify(compra))

}

const listado = (indice)=> {

    let found = productos.find(element => element.id == indice);
    

    descarga = JSON.parse(localStorage.getItem("carrito"))

    if (descarga == null) { //carrito de compra vacio
        compra.push(new carrito(found.id, found.nombre, 1))
        $("#lblCartCount").text(compra.length)
        localStorage.setItem("carrito", JSON.stringify(compra))


        //agrego el producto a carrito
        $(".carro").append(`
        <div id="${found.nombre}" class="col">            
            <h3>${found.nombre.toUpperCase()}</h3>
            <input type="text" id="myText" value="1">
            <button id="myBtn"  onclick="listado(${found.id})">Aumentar</button>
            <button id="myBtn2" onclick="menosCantidad(${found.id})">Disminuir</button>
        <span>$${found.precio}</span>
    
        </div>
        `)

        //modifico la card
        found.stock--;
        $(`#${indice} .stock`).text(`Stock: ${found.stock}`);
        

        
    }else{ // carrito de compra con datos
        let fuente = descarga.find(element => element.id == indice);
        if (fuente == null) { // verifico si el producto ya fue puesto en carrito

            compra.push(new carrito(found.id, found.nombre, 1))
            $("#lblCartCount").text(compra.length)
            localStorage.setItem("carrito", JSON.stringify(compra))


            //agrego el producto a carrito
            $(".carro").append(`
            <div id="${found.nombre}" class="col">            
                <h3>${found.nombre.toUpperCase()}</h3>
                <input type="text" id="myText" value="1">
                <button id="myBtn"  onclick="listado(${found.id})">Aumentar</button>
                <button id="myBtn2" onclick="menosCantidad(${found.id})">Disminuir</button>
                <span>$${found.precio}</span>
        
            </div>
            `)

            //modifico la card
            found.stock--;
            $(`#${indice} .stock`).text(`Stock: ${found.stock}`);
            

        }else{ //el producto ya estaba en carrito

            //añado una cantidad mas a carrito
            $(`#${found.nombre} input`).val(fuente.cantidad + 1);            
            var foundIndex = compra.findIndex(x => x.nombre == fuente.nombre);
            compra[foundIndex].cantidad++;
            $(`#${found.nombre} span`).text(`$${found.precio * compra[foundIndex].cantidad}`)

            found.stock--;
            $(`#${indice} .stock`).text(`Stock: ${found.stock}`);
            

            localStorage.setItem("carrito", JSON.stringify(compra))            
                    
        }
    } 
}

const quitar = (id) =>{
    let indexCompra = compra.findIndex(x => x.id == id);
    let indexProducto = productos.findIndex(x => x.id == id);


    $(`#${id}`).remove()
    $(`#${compra[indexCompra].nombre}`).remove()
    

    compra.splice(indexCompra, 1);
    productos.splice(indexProducto, 1);    

    $("#lblCartCount").text(compra.length)
    localStorage.setItem("carrito", JSON.stringify(compra))
    console.log(productos);

}

localStorage.clear()

btnEnviar.addEventListener("click", agregar);


let URLGET = "assets/datos.json"
$.get(URLGET, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      for (const dato of misDatos){
        
        productos.push(new producto(dato.id, dato.nombre, dato.precio, dato.stock));

        $("#cards").append(`
        <div id="${dato.id}" class="card" style="width: 18rem; margin: 15px">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn" onclick = "quitar(${dato.id})">x</span>
                    <div class="card-body">
                    <h5 class="card-title text-center">${dato.nombre.toUpperCase()}</h5>
                    <p class="card-text">Precio: $${dato.precio}</p>
                    <p class="card-text stock">Stock: ${dato.stock}</p>
                    <a href="#" class="btn btn-primary" onclick = "listado(${dato.id})">Comprar</a>
                    </div>
                </div>
        `);
      }
      console.log(misDatos); 
    }
});

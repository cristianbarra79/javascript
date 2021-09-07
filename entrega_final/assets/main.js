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

let index = 1;
let datos = ""
let opciones = ""
let oscuro = false

let btnEnviar = document.getElementById("enviar");

function agregar(e) {// agrega card del producto cargado

    e.preventDefault()
    let nombre = $("#nombre").val()
    let precio = $("#precio").val()
    let stock = $("#stock").val()  
    
    if (isNaN(precio) || isNaN(stock)) {
        alert('Ingrese valores numericos');
        $("#nombre").val("");
        $("#precio").val("")
        $("#stock").val("")
        $("#nombre").focus()
        return;
    }

    if (productos.filter(e => e.nombre === nombre).length > 0) {//comprueba si el producto ya existe
        alert("El producto a agregar ya existe");
        $("#nombre").val("");
        $("#precio").val("")
        $("#stock").val("")
        $("#nombre").focus()
    }else{
        productos.push(new producto(index, nombre, precio, stock));

        $("#cards").append(`
        <div id="${index}" class="card" style="width: 18rem; margin: 15px">
        <span id="${index}" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn delete" style="display:none">x</span>
                    <div class="card-body">
                    <h5 class="card-title text-center">${nombre.toUpperCase()}</h5>
                    <p class="card-text">Precio: $${precio}</p>
                    <p class="card-text stock">Stock: ${stock}</p>
                    <a href="#" id="${index}" class="btn btn-primary buy">Comprar</a>
                    </div>
                </div>
        `);

        $("#nombre").val("");
        $("#precio").val("")
        $("#stock").val("")
        $("#nombre").focus()
        index++;
    }
}

function menosCantidad(id) {

    let indexCompra = compra.findIndex(x => x.id == id);
    let indexProducto = productos.findIndex(x => x.id == id);

    if (compra[indexCompra].cantidad == 1) { //revisa si al quitar cantidad de compra no sea el ultimo
        $(`#${compra[indexCompra].nombre}`).remove()
        compra.splice(indexCompra, 1);

        productos[indexProducto].stock++;
        $(`#${id} .stock`).text(`Stock: ${productos[indexProducto].stock}`);
        $("#lblCartCount").text(compra.length)
        localStorage.setItem("carrito", JSON.stringify(compra))
    }else{
        productos[indexProducto].stock++;
        $(`#${id} .stock`).text(`Stock: ${productos[indexProducto].stock}`);

        compra[indexCompra].cantidad--;
        $(`#${compra[indexCompra].nombre} input`).val(compra[indexCompra].cantidad);

        $(`#${compra[indexCompra].nombre} span`).text(`$${productos[indexProducto].precio * compra[indexCompra].cantidad}`)

        localStorage.setItem("carrito", JSON.stringify(compra))

    }

    $(".offcanvas-footer span").text(`$ ${precioTotal()}`)
}

const listado = (indice)=> {

    let found = productos.find(element => element.id == indice);
    
    descarga = JSON.parse(localStorage.getItem("carrito"))

    if (found.stock > 0) {
        if (descarga == null) { //carrito de compra vacio
            compra.push(new carrito(found.id, found.nombre, 1))
            $("#lblCartCount").text(compra.length)
            localStorage.setItem("carrito", JSON.stringify(compra))
    
            //agrego el producto a carrito
            $(".carro").append(`
            <div id="${found.nombre}" class="col">            
                <h3>${found.nombre.toUpperCase()}</h3>
                <input type="text" id="myText" value="1">
                <button id="${found.id}" class="buy" >Aumentar</button>
                <button id="${found.id}" class="retornar">Disminuir</button>
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
        
    }else{
        alert("Sin stock");
    }

    $(".offcanvas-footer span").text(`$ ${precioTotal()}`)
}

const precioTotal = () =>{//agrega el precio total en el offcanvas
    let total = 0

    compra.forEach((value) => {
        let indexProducto = productos.findIndex(x => x.id == value.id); 
        total += productos[indexProducto].precio * value.cantidad
        
    });
    return total
}

const quitar = (id) =>{
    let indexCompra = compra.findIndex(x => x.id == id);
    let indexProducto = productos.findIndex(x => x.id == id);

    $(`#${id}`).remove()

    if (indexCompra >= 0) {
        $(`#${compra[indexCompra].nombre}`).remove()
        compra.splice(indexCompra, 1);
        $("#lblCartCount").text(compra.length)
    }
    
    productos.splice(indexProducto, 1);    
    
    localStorage.setItem("carrito", JSON.stringify(compra))
    $(".offcanvas-footer span").text(precioTotal())

}

function modo() {//modo oscuro
    if (oscuro == false) {
        $("body").css({ 
            "background-color": "black",
            "color": "white"
        });
        $("#cards").css({       
            "color": "black"
        });
        $("#offcanvasRight").css({
            "background-color": "black",
            "color": "white"
        })
        oscuro = true
        document.getElementById("darkmode").innerHTML = "Light Mode";
    }else{
        $("body").css({ 
            "background-color": "white",
            "color": "black"
        });
        $("#cards").css({       
            "color": "black"
        });
        $("#offcanvasRight").css({
            "background-color": "white",
            "color": "black"
        })
        oscuro = false
        document.getElementById("darkmode").innerHTML = "Dark Mode";
    }
}

localStorage.clear()

btnEnviar.addEventListener("click", agregar);

//carga prodcutos desde un json
let URLGET = "assets/datos.json"
$.get(URLGET, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      for (const dato of misDatos){
        
        productos.push(new producto(dato.id, dato.nombre, dato.precio, dato.stock));

        $("#cards").append(`
        <div id="${dato.id}" class="card" style="width: 18rem; margin: 15px">
        <span id="${dato.id}" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn delete" style="display:none">x</span>
                    <div class="card-body">
                    <h5 class="card-title text-center">${dato.nombre.toUpperCase()}</h5>
                    <p class="card-text">Precio: $${dato.precio}</p>
                    <p class="card-text stock">Stock: ${dato.stock}</p>
                    <a href="#" id="${dato.id}" class="btn btn-primary buy">Comprar</a>
                    </div>
                </div>
        `);
        index++;
      }       
    }
});


$(document).on("click",".delete",function(){
    quitar($(this).attr("id"))            
})

$(document).on("click",".buy",function(){
    listado($(this).attr("id"))
})

$(document).on("click",".retornar",function(){
    menosCantidad($(this).attr("id"))
})

$(document).on("mouseover",".card",function(){
    $(this).children('span').show();
    
})

$(document).on("mouseout",".card",function(){
    $(this).children('span').hide();    
})

$("#darkmode").click(modo)
class producto{
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);                
    }
}

let index = 1;
const productos =[]
let oscuro = false

const agregar = (e)=> {
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

function listado(indice) {  
    let found = productos.find(element => element.id == indice);
    found.stock--;
    $(`#${indice} .stock`).text(`Stock: ${found.stock}`);
    $("#indice .stock").text(`Stock: ${found.stock}`);
    $(".pedidos").append(`<h3>Usted compro ${found.nombre.toUpperCase()} por ${found.precio} </h3>`
    ).slideDown(3000)
}

function quitar(numero) {
    let borrar = "#"+numero
    $(borrar).remove();
}

function modo() {    
    if (oscuro == false) {
        $("body").css({ 
            "background-color": "black",
            "color": "white"
        });
        $("#cards").css({       
            "color": "black"
        });
        oscuro = true
    }else{
        $("body").css({ 
            "background-color": "white",
            "color": "black"
        });
        $("#cards").css({       
            "color": "black"
        });
        oscuro = false
    }
}

const options = ()=> {
    $("#opciones").html("")
    $.each(productos, (index, value) =>{
        $("#opciones").append(`<option value="${value.id}">${value.nombre}</option>`)
    });    
}

const finalizar = ()=> {

    let valor = $("#opciones").val()
    let cant = parseInt($("#cantidad").val())
    
    let encuentro = productos.find(element => element.id == valor);

    $(".pedidos").append(`<h3>Usted compro ${encuentro.nombre} por ${encuentro.precio * cant} </h3>`
    )
}

$(".cargar").hide()
$(".vender").hide()

$("#carga").click(function() {
    $(".vender").hide();    
    $(".cargar").fadeIn();
})

$("#venta").click(function() {
    $(".cargar").hide();    
    $(".vender").fadeIn();
    options()
})

$("#enviar").click(agregar)
$("#finalizar").click(finalizar)
$("#darkmode").click(modo)



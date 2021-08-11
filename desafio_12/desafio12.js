let id = 1;

const agregar = (e)=> {
    e.preventDefault()
    let nombre = $("#nombre").val()
    let precio = $("#precio").val()
    let stock = $("#stock").val()
    console.log(nombre);
    $("#cards").append(`
    <div id="${id}" class="card" style="width: 18rem; margin: 15px">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick = "quitar(${id})">x</span>
                <div class="card-body">
                  <h5 class="card-title text-center">${nombre.toUpperCase()}</h5>
                  <p class="card-text">Precio: $${precio}</p>
                  <p class="card-text">Stock: ${stock}</p>
                  <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            </div>
    `);

    $("#nombre").val("");
    $("#precio").val("")
    $("#stock").val("")
    $("#nombre").focus()

    id++;
    console.log($("button"));
}

function quitar(numero) {
    let borrar = "#"+numero
    $(borrar).remove();
    console.log(numero);
}

$("#enviar").click(agregar);

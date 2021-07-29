class producto{
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = parseInt(stock);                
    }
}

productos = []
descarga = []
let todo = ""
let boton = document.getElementById("enviar");
let mostrar = document.getElementById("mostrar");
let incrustrar = document.getElementById("tabla")

function agregar(e) {
    
    e.preventDefault()

    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    let stock = document.getElementById("stock").value

    productos.push(new producto(nombre, precio, stock));

    localStorage.setItem("productos", JSON.stringify(productos))

    document.getElementById("nombre").value = null;
    document.getElementById("precio").value = null;
    document.getElementById("stock").value = null;

    document.getElementById("nombre").focus()

}

function mostrarTabla(e) {
    e.preventDefault()

    descarga = JSON.parse(localStorage.getItem("productos"))
    console.log(descarga);        

    todo = `
    <table id="tabla" width="25%" border="1" cellpadding="0" cellspacing="0" >

        <tr>
        
            <th>Nombre</th>
            
            <th>Precio</th>
            
            <th>stock</th>
        
        </tr>
        <tr>
                
            <td>${descarga[0].nombre}</td>
            
            <td>$${descarga[0].precio}</td>
            
            <td>${descarga[0].stock}</td>
                
        </tr>`

    for (var i = 1; i < descarga.length; i+=1) {

        todo += `
        <tr>
                
            <td>${descarga[i].nombre}</td>
            
            <td>$${descarga[i].precio}</td>
            
            <td>${descarga[i].stock}</td>
                
        </tr>`
    }

    todo += `
    </table>`

    let tr = document.createElement("table");
    tr.innerHTML = todo
    incrustrar.appendChild(tr);
}

boton.addEventListener("click", agregar);
mostrar.addEventListener("click", mostrarTabla);
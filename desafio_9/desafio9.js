function agregar(e) {
    e.preventDefault()
  
    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value
    let stock = document.getElementById("stock").value
        
    let tabla = document.getElementById("tabla");

    let producto = `
    <tr>
            
        <td>${nombre}</td>
        
        <td>$${precio}</td>
        
        <td>${stock}</td>
            
    </tr>`

    let tr = document.createElement("tr");
    tr.innerHTML = producto
    tabla.appendChild(tr);

    document.getElementById("nombre").value = null;
    document.getElementById("precio").value = null;
    document.getElementById("stock").value = null;
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", agregar);
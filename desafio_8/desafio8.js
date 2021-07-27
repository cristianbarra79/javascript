nombre = prompt("Ingrese nombre de la fruta:");
precio = prompt("Ingrese precio del producto:");
stock =  prompt("Ingrese stock del producto:");

let tabla = document.getElementById("tabla");

let producto = `
<tr>
        
    <td>${nombre}</td>
    
    <td>${precio}</td>
    
    <td>${stock}</td>
        
</tr>`


let tr = document.createElement("tr");
tr.innerHTML = producto
tabla.appendChild(tr);
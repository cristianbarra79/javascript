const key = "ca7ce46c759e051101f4b8761101c131"

const clima = () =>{

    let ciudad = $("#ciudad").val()
    let URLGET = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&lang=es`    
    $.get(URLGET, function (respuesta, estado) {
        if(estado === "success"){                  
            let tiempo = respuesta;                  
            let temperaturaCompleta = parseInt(tiempo.main.temp) - 273.15
            let temperatura = temperaturaCompleta.toFixed(1);             
            let icono = `http://openweathermap.org/img/wn/${tiempo.weather[0].icon}@2x.png`
            $("#card").append(`
            <div class="card" style="width: 10rem;">
                <img src="${icono}" class="card-img-top" alt="imagen de clima">
                <p class="card-text text-center">${tiempo.weather[0].description}</p>
                <div class="card-body">
                    <h5 class="card-title">${tiempo.name}</h5>
                    <p class="card-text">Temperatura: ${temperatura}</p>
                </div>
            </div>
            `)         
        }        
  });

}

$("#buscar").click(clima)
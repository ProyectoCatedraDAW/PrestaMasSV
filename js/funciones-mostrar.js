//FUNCION PARA MOSTRAR LOS PRESTADORES
function leerPrestadores() {
    let prestadores = JSON.parse(localStorage.getItem("Prestadores"));
    document.getElementById("prestador").innerHTML = ``
    for (let i = 0; i < prestadores.length; i++) {
        let nombre = prestadores[i].nombre
        document.getElementById("prestador").innerHTML +=
            `
            <option value="${nombre}">${nombre}</option>            
            `
    }
}

//FUNCION PARA MOSTRAR LAS PERTENENCIAS
function leerPertenencias() {
    let pertenencias = JSON.parse(localStorage.getItem("Pertenencias"));
    document.getElementById("pertenencia").innerHTML = ``
    for (let i = 0; i < pertenencias.length; i++) {
        let nombre = pertenencias[i].nombre
        document.getElementById("pertenencia").innerHTML +=
            `
            <option value="${nombre}">${nombre}</option>            
            `
    }
}

//FUNCION PARA FECHA ACTUAL
function fechaActual() {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let formato1 = `${year}-${mes}-${dia}`;
    document.getElementById("fecha1").value = formato1;
}

leerPrestadores();
leerPertenencias();
fechaActual();
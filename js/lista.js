//FUNCION PARA MANDAR A LA LISTA NEGRA
function lista(nombre) {
    let = prestamistas = JSON.parse(localStorage.getItem("Prestamos"));
    for (let i = 0; i < prestamistas.length; i++) {
        if (prestamistas[i].nombre === nombre) {
            let nombre = prestamistas[i].nombre;
            let objeto = prestamistas[i].objeto;

            let prestadorLista = {
                nombre,
                objeto
            }

            if (localStorage.getItem("Lista Negra") === null) {
                let lista = []
                lista.push(prestadorLista)
                localStorage.setItem("Lista Negra", JSON.stringify(lista))
                alert("Agregado a la lista negra.");
            } else {
                let lista = JSON.parse(localStorage.getItem("Lista Negra"))
                lista.push(prestadorLista)
                localStorage.setItem("Lista Negra", JSON.stringify(lista))
                alert("Agregado a la lista negra.");
            }
            leerLista();
            document.getElementById("formulario-lista").reset();
            nombre.preventDefault();
        }
    }
}

//FUNCION PARA LEER LA LISTA NEGRA
function leerLista() {
    let prestamistas = JSON.parse(localStorage.getItem("Lista Negra"));
    document.getElementById("listas").innerHTML = ``
    for (let i = 0; i < prestamistas.length; i++) {
        let nombre = prestamistas[i].nombre;
        let objeto = prestamistas[i].objeto;

        document.getElementById("listas").innerHTML +=
            `
            <tr>
                <td>${nombre}</td>
                <td>${objeto}</td>  
                <td><button onclick="eliminarLista('${nombre}')" class="btn btn-danger">Eliminar</button></td>               
            </tr>
            `
    }
}
leerLista();

//FUNCION PARA ELIMINAR DE LA LISTA NEGRA
function eliminarLista(nombre) {
    let prestamistas = JSON.parse(localStorage.getItem("Lista Negra"));
    for (let i = 0; i < prestamistas.length; i++) {
        if (prestamistas[i].nombre === nombre) {
            prestamistas.splice(i, 1);
            alert("Eliminado de la lista negra");
        }
    }
    localStorage.setItem("Lista Negra", JSON.stringify(prestamistas));
    leerLista();
}
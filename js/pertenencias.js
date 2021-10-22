document.getElementById("formulario").addEventListener("submit", crear);

//FUNCION PARA QUE EL USUARIO PUEDA INGRESAR OTRA CATEGORIA A LA PERTENENCIA QUE VA A REGISTRAR
function otraCategoria() {
    var otraCategoria = document.getElementById("categoria").value;
    if (otraCategoria == "Otra") {
        document.getElementById("añadir").style.display = "block";
    } else {
        document.getElementById("añadir").style.display = "none";
    }
}

//FUNCION PARA QUE EL USUARIO PUEDA INGRESAR OTRA CATEGORIA A LA PERTENENCIA CUANDO VA A EDITAR
function otraCategoriaEditar() {
    var otraCategoriaEditar = document.getElementById("newcategoria").value;
    if (otraCategoriaEditar == "Otra") {
        document.getElementById("añadir").style.display = "block";
    }
}

//FUNCION CREAR UNA NUEVA PERTENENCIA
function crear(e) {
    nombre = document.getElementById("nombre").value;
    descripcion = document.getElementById("descripcion").value;
    categoria = document.getElementById("categoria").value;

    //VALIDACION CAMPOS VACIOS
    if (nombre == "") {
        alert("Complete el campo de nombre.");
    } else {
        if (descripcion == "") {
            alert("Complete el campo de la descripcion.");
        } else {
            if (categoria == "") {
                alert("Complete el campo de categoria.");
            } else {
                if (categoria == "Otra") {
                    categoria = document.getElementById("añadir").value;
                    document.getElementById("otra-categoria").style.display = "block";
                }

                let pertenencia = {
                    nombre,
                    descripcion,
                    categoria
                }

                if (localStorage.getItem("Pertenencias") === null) {
                    let pertenencias = []
                    pertenencias.push(pertenencia)
                    localStorage.setItem("Pertenencias", JSON.stringify(pertenencias))
                    alert("Pertenencia guardada correctamente");
                } else {
                    let pertenencias = JSON.parse(localStorage.getItem("Pertenencias"))
                    pertenencias.push(pertenencia)
                    localStorage.setItem("Pertenencias", JSON.stringify(pertenencias))
                    alert("Pertenencia guardada correctamente");
                }
                leer();
                document.getElementById("formulario").reset();
                e.preventDefault();
            }
        }
    }


}

//FUNCION PARA LEER PERTENENCIAS
function leer() {
    let pertenencias = JSON.parse(localStorage.getItem("Pertenencias"));
    document.getElementById("tbody").innerHTML = ``
    for (let i = 0; i < pertenencias.length; i++) {
        let nombre = pertenencias[i].nombre
        let descripcion = pertenencias[i].descripcion
        let categoria = pertenencias[i].categoria

        document.getElementById("tbody").innerHTML +=
            `
            <tr>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td>${categoria}</td>                      
                <td><button onclick="editar('${nombre}')" class="btn btn-success">Editar</button></td>          
                <td><button onclick="eliminar('${nombre}')" class="btn btn-danger">Eliminar</button></td>
            </tr>
            `
    }
}
leer();

//FUNCION PARA EDITAR PERTENENCIAS
function editar(nombre) {
    document.getElementById("formulario").style.display = "none";
    let = pertenencias = JSON.parse(localStorage.getItem("Pertenencias"));
    for (let i = 0; i < pertenencias.length; i++) {
        if (pertenencias[i].nombre === nombre) {
            document.getElementById("body").innerHTML = `
                <div class="card-contenedor">
                    <div class="card">
                        <div class="card-header">
                            <h2>Editar pertenencia</h2>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <input type="text" id="newnombre" class="form-control" value="${pertenencias[i].nombre}" required>
                                </div><br>
                                <div class="form-group">
                                    <textarea id="newdescripcion" class="form-control" required>${pertenencias[i].descripcion}</textarea>
                                </div><br>
                                <div class="form-group">
                                <p>Categoría</p>
                                <select class="form-select" id="newcategoria" onchange="otraCategoriaEditar()" required>
                                    <option value="Libros">Libros</option>
                                    <option value="Electronicos">Electrónicos</option>
                                    <option value="Videojuegos">Videojuegos</option>
                                    <option value="Otra">Otra</option>
                                </select>
                                </div><br>
                                <div class="form-group">
                                    <input class="form-control" type="text" id="añadir" placeholder="Añadir otra categoria" required>
                                </div>   
                            </form>
                            <hr>
                            <div class="editar-acciones">
                            <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                            <button class="btn btn-danger" onclick="vistaPrincipal()">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>           
            `
        }
    }
}

//FUNCION PARA ACTUALIZAR PERTENENCIAS
function actualizar(i) {
    let = pertenencias = JSON.parse(localStorage.getItem("Pertenencias"));
    pertenencias[i].nombre = document.getElementById("newnombre").value;
    pertenencias[i].descripcion = document.getElementById("newdescripcion").value;
    pertenencias[i].categoria = document.getElementById("newcategoria").value;
    if (pertenencias[i].categoria == "Otra") {
        pertenencias[i].categoria = document.getElementById("añadir").value;
    }
    if (pertenencias[i].nombre == "") {
        alert("No ha ingresado el nombre");
    } else {
        if (pertenencias[i].descripcion == "") {
            alert("No ha ingresado la descripcion");
        } else {
            if (pertenencias[i].categoria == "") {
                alert("No ha ingresado la descripcion");
            } else {
                alert("Información actualizada correctamente");
                localStorage.setItem("Pertenencias", JSON.stringify(pertenencias));
                vistaPrincipal()
            }
        }
    }

}

//FUNCION PARA ELIMINAR PERTENENCIAS
function eliminar(nombre) {
    let pertenencias = JSON.parse(localStorage.getItem("Pertenencias"));
    for (let i = 0; i < pertenencias.length; i++) {
        if (pertenencias[i].nombre === nombre) {
            pertenencias.splice(i, 1);
            alert("Pertenencia eliminada correctamente");
        }
    }
    localStorage.setItem("Pertenencias", JSON.stringify(pertenencias));
    leer();
}

//FUNCION PARA MOSTRAR O REGRESAR A LA INTERFAZ PRINCIPAL
function vistaPrincipal() {
    location.reload();
    leer();
}
leer()
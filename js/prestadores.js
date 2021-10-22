document.getElementById("formulario").addEventListener("submit", crear);

//FUNCION PARA QUE EL USUARIO PUEDA INGRESAR OTRO PARENTESCO
function otroParentesco() {
    var otroParentesco = document.getElementById("parentesco").value;
    if (otroParentesco == "Otro") {
        document.getElementById("añadir").style.display = "block";
    } else {
        document.getElementById("añadir").style.display = "none";
    }
}

//FUNCION PARA QUE EL USUARIO PUEDA INGRESAR OTRO PARENTESCO CUANDO SE ESTA EDITANDO
function otroParentescoEditar() {
    var otroParentescoEditar = document.getElementById("newparentesco").value;
    if (otroParentescoEditar == "Otro") {
        document.getElementById("añadir").style.display = "block";
    } else {
        document.getElementById("añadir").style.display = "none";
    }
}

//FUNCION CREAR UN NUEVO PRESTADOR
function crear(e) {
    nombre = document.getElementById("nombre").value;
    parent = document.getElementById("parentesco").value;
    correo = document.getElementById("email").value;
    numero = document.getElementById("telefono").value;

    //VALIDACION CAMPOS VACIOS
    if (nombre == "") {
        alert("Complete el campo de nombre.")
    } else {
        if (parent == "") {
            alert("Complete el campo de la parentesco.")
        } else {
            if (correo == "") {
                alert("Complete el campo de correo.")
            } else {
                if (numero == "") {
                    alert("Complete el campo de numero.")
                } else {
                    if (parent == "Otro") {
                        parent = document.getElementById("añadir").value;
                        document.getElementById("otro-parentesco").style.display = "block";
                    } else {
                        parent = document.getElementById("parentesco").value;
                    }
                    let prestador = {
                        nombre,
                        parent,
                        correo,
                        numero
                    }

                    if (localStorage.getItem("Prestadores") === null) {
                        let prestadores = []
                        prestadores.push(prestador)
                        localStorage.setItem("Prestadores", JSON.stringify(prestadores))
                        alert("Prestador guardado correctamente.");
                    } else {
                        let prestadores = JSON.parse(localStorage.getItem("Prestadores"))
                        prestadores.push(prestador)
                        localStorage.setItem("Prestadores", JSON.stringify(prestadores))
                        alert("Prestador guardado correctamente.");
                    }
                    leer();
                    document.getElementById("formulario").reset();
                    e.preventDefault();
                }
            }
        }
    }
}

//FUNCION PARA LEER PRESTADORES
function leer() {
    let prestadores = JSON.parse(localStorage.getItem("Prestadores"));
    document.getElementById("tbody").innerHTML = ``
    for (let i = 0; i < prestadores.length; i++) {
        let nombre = prestadores[i].nombre
        let parent = prestadores[i].parent
        let correo = prestadores[i].correo
        let numero = prestadores[i].numero

        document.getElementById("tbody").innerHTML +=
            `
            <tr>
                <td>${nombre}</td>
                <td>${parent}</td>
                <td>${correo}</td>   
                <td>${numero}</td>                   
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
    let = prestadores = JSON.parse(localStorage.getItem("Prestadores"));
    for (let i = 0; i < prestadores.length; i++) {
        if (prestadores[i].nombre === nombre) {
            document.getElementById("body").innerHTML = `
            <div class="card-contenedor">
            <div class="card">
                <div class="card-header">
                    <h2>Agregar un nuevo prestador</h2>
                </div>
                <div class="card-body">
                    <form id="formulario">
                        <div class="form-group">
                            <input type="text" id="newnombre" class="form-control" value="${prestadores[i].nombre}" required>
                        </div><br>                                                     
                        <div class="form-group">
                            <p>Parentesco:</p>
                            <select class="form-select" id="newparentesco" onchange="otroParentescoEditar()" required>
                                <option value="Papá">Papá</option>
                                <option value="Mamá">Mamá</option>
                                <option value="Hermano/Hermana">Hermano/Hermana</option>
                                <option value="Amigo/Amiga">Amigo/Amiga</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div><br>
                        <div class="input-group" id="otro-parentesco">
                            <input class="form-control" type="text" id="añadir" placeholder="Añadir otro parentesco" required>
                        </div><br>
                        <div class="form-group">
                            <input type="email" id="newemail" class="form-control" value="${prestadores[i].correo}" required>
                        </div><br>
                        <div class="form-group">
                            <input type="tel" id="newtelefono" class="form-control" value="${prestadores[i].numero}" required>
                        </div>                                                     
                        <hr>
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

//FUNCION PARA ACTUALIZAR PRESTADORES
function actualizar(i) {
    let = prestadores = JSON.parse(localStorage.getItem("Prestadores"));
    prestadores[i].nombre = document.getElementById("newnombre").value;
    prestadores[i].parent = document.getElementById("newparentesco").value;
    prestadores[i].correo = document.getElementById("newemail").value;
    prestadores[i].numero = document.getElementById("newtelefono").value;
    if (prestadores[i].parent == "Otro") {
        prestadores[i].parent = document.getElementById("añadir").value;
    }
    if (prestadores[i].nombre == "") {
        alert("No ha ingresado el nombre");
    } else {
        if (prestadores[i].parent == "") {
            alert("No ha ingresado el parentesco");
        } else {
            if (prestadores[i].correo == "") {
                alert("No ha ingresado el correo");
            } else {
                if (prestadores[i].numero == "") {
                    alert("No ha ingresado el numero");
                } else {
                    alert("Información actualizada correctamente");
                    localStorage.setItem("Prestadores", JSON.stringify(prestadores));
                    vistaPrincipal()
                }
            }
        }
    }
}

//FUNCION PARA ELIMINAR PRESTADORES
function eliminar(nombre) {
    let prestadores = JSON.parse(localStorage.getItem("Prestadores"));
    for (let i = 0; i < prestadores.length; i++) {
        if (prestadores[i].nombre === nombre) {
            prestadores.splice(i, 1);
            alert("Prestador eliminado correctamente");
        }
    }
    localStorage.setItem("Prestadores", JSON.stringify(prestadores));
    leer();
}

//FUNCION PARA MOSTRAR O REGRESAR A LA INTERFAZ PRINCIPAL
function vistaPrincipal() {
    location.reload();
    leer();
}
leer()
document.getElementById("formulario").addEventListener("submit", crear);

//FUNCION PARA CREAR UN NUEVO PRESTAMO
function crear(e) {
    nombre = document.getElementById("prestador").value;
    objeto = document.getElementById("pertenencia").value;
    fechaAct = document.getElementById("fecha1").value;
    fechaDev = document.getElementById("fecha2").value;
    prorroga = 0;
    //cantD = 0;

    //VALIDACION CAMPOS VACIOS
    if (nombre == "") {
        alert("Complete el campo de prestador.");
    } else {
        if (objeto == "") {
            alert("Complete el campo de pertenencia.");
        } else {
            if (fechaAct == "") {
                alert("Complete el campo de fecha actual.");
            } else {
                if (fechaDev == "") {
                    alert("Complete el campo de fecha de devolucion.");
                } else {
                    //VALIDAR LA FECHA DE DEVOLUCION
                    var fechaActual = new Date();
                    let dia = fechaActual.getDate();
                    let mes = fechaActual.getMonth() + 1;
                    let year = fechaActual.getFullYear();
                    let formato1 = `${year}-${mes}-${dia}`;
                    var fechaCapturada = document.getElementById('fecha2').value;
                    if (fechaCapturada < formato1) {
                        alert('La fecha ingresada tiene que ser mayor a la fecha actual.');
                    } else {
                        
                        let prestamista = {
                            nombre,
                            objeto,
                            fechaAct,
                            fechaDev,
                            prorroga                        
                        }

                        if (localStorage.getItem("Prestamos") === null) {
                            let prestamos = []
                            prestamos.push(prestamista)
                            localStorage.setItem("Prestamos", JSON.stringify(prestamos))
                            alert("Prestamo guardado correctamente");
                        } else {
                            let prestamos = JSON.parse(localStorage.getItem("Prestamos"))
                            prestamos.push(prestamista)
                            localStorage.setItem("Prestamos", JSON.stringify(prestamos))
                            alert("Prestamo guardado correctamente");
                        }
                        leer();
                        //leerLista();
                        document.getElementById("formulario").reset();
                        e.preventDefault();
                    }
                }
            }
        }
    }
}

//FUNCION PARA LEER PRESTAMOS
function leer() {
    let prestamistas = JSON.parse(localStorage.getItem("Prestamos"));
    document.getElementById("tbody").innerHTML = ``
    for (let i = 0; i < prestamistas.length; i++) {

        let nombre = prestamistas[i].nombre;
        let objeto = prestamistas[i].objeto;
        let fechaAct = prestamistas[i].fechaAct;
        let fechaDev = prestamistas[i].fechaDev;
        let prorroga = prestamistas[i].prorroga;
        let cantD = prestamistas[i].cantD;

        document.getElementById("tbody").innerHTML +=
            `
            <tr>
                <td>${nombre}</td>
                <td>${objeto}</td>
                <td>${fechaAct}</td> 
                <td>${fechaDev}</td> 
                <td>${prorroga}</td>                     
                <td><button onclick="editar('${nombre}')" class="btn btn-success">Editar fecha</button></td>          
                <td><button onclick="eliminar('${nombre}')" class="btn btn-danger">Eliminar</button></td>
                <td><button onclick="lista('${nombre}')"" class="btn btn-dark">Agregar a la lista negra</button></td>
            </tr>
            `
    }
}
leer();

//FUNCION PARA EDITAR PERTENENCIAS
function editar(nombre) {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("lista").style.display = "none";
    document.getElementById("ti-lista").style.display = "none";
    let = prestamistas = JSON.parse(localStorage.getItem("Prestamos"));
    for (let i = 0; i < prestamistas.length; i++) {
        if (prestamistas[i].nombre === nombre) {
            document.getElementById("body").innerHTML = `
            <div class="card-contenedor">
            <div class="card">
                <div class="card-header">
                    <h2>Editar fecha de devolución</h2>
                </div>
                <div class="card-body">
                    <form id="formulario">   
                        <div class="form-group">
                            <input type="text" id="newnombre" class="form-control" value="${prestamistas[i].nombre}" readonly required>
                        </div><br>
                        <div class="form-group">
                            <input type="text" id="newobjeto" class="form-control" value="${prestamistas[i].objeto}" readonly required>
                        </div><br>                  
                        <div class="form-group">
                            <p>Fecha en que se prestó:</p>
                            <input type="text" id="newfecha1" class="form-control" value="${prestamistas[i].fechaAct}" readonly required>
                        </div><br>
                        <div class="form-group">
                            <p>Fecha de devolución:</p>
                            <input type="date" id="newfecha2" class="form-control" value="${prestamistas[i].fechaDev}" required>
                        </div><br>
                        <div class="form-group">
                            <p>Cantidad de veces que se ha dado prorroga:</p>
                            <input type="number" id="newprorroga" class="form-control" value="${prestamistas[i].prorroga}" readonly required>
                        </div>
                        <hr>
                        <div class="editar-acciones">
                        <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                        <button class="btn btn-danger" onclick="vistaPrincipal()">Cancelar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div> 
            `
        }
    }
}

//FUNCION PARA ACTUALIZAR PERTENENCIAS
function actualizar(i) {
    let = prestamistas = JSON.parse(localStorage.getItem("Prestamos"));
    prestamistas[i].fechaDev = document.getElementById("newfecha2").value;
    prestamistas[i].prorroga = document.getElementById("newprorroga").value;

    if (prestamistas[i].fechaDev == "") {
        alert("No ha ingresado el prestador");
    } else {
        if (prestamistas[i].prorroga == "") {
            alert("No ha ingresado la prorroga");
        } else {
            //AUMENTAR PRORROGA            
            prestamistas[i].prorroga++;
            //VALIDAR LA FECHA DE DEVOLUCION
            var fechaActual = new Date();
            let dia = fechaActual.getDate();
            let mes = fechaActual.getMonth() + 1;
            let year = fechaActual.getFullYear();
            let formato1 = `${year}-${mes}-${dia}`;
            var fechaCapturada = document.getElementById('newfecha2').value;
            if (fechaCapturada < formato1) {
                alert('La fecha ingresada tiene que ser mayor a la fecha actual.');
            } else {
                alert("Información actualizada correctamente");
                localStorage.setItem("Prestamos", JSON.stringify(prestamistas));
                vistaPrincipal()
            }
        }
    }
}

//FUNCION PARA ELIMINAR PERTENENCIAS
function eliminar(nombre) {
    let prestamistas = JSON.parse(localStorage.getItem("Prestamos"));
    for (let i = 0; i < prestamistas.length; i++) {
        if (prestamistas[i].nombre === nombre) {
            prestamistas.splice(i, 1);
            alert("Prestamo eliminado correctamente");
        }
    }
    localStorage.setItem("Prestamos", JSON.stringify(prestamistas));
    leer();
}

//FUNCION PARA MOSTRAR O REGRESAR A LA INTERFAZ PRINCIPAL
function vistaPrincipal() {
    location.reload();
    leer();
}
leer();

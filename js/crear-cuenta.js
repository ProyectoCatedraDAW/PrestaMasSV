function crear() {
    //DECLARACION VARIABLES
    usuario = document.getElementById("usuario").value;
    contra = document.getElementById("contra").value;
    contra2 = document.getElementById("contra2").value;

    //VALIDACION CAMPOS VACIOS
    if (usuario == "") {
        alert("Complete el campo de usuario.");
    } else {
        if (contra == "") {
            alert("Complete el campo de la contraseña.");
        } else {
            if (contra2 == "") {
                alert("Complete el campo de confirmar contraseña.");
            } else {
                if (contra2 === contra) {
                    let cuenta = {
                        usuario,
                        contra
                    }
                    if (localStorage.getItem("Usuarios") === null) {
                        let usuarios = []
                        usuarios.push(cuenta)
                        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
                    } else {
                        let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
                        usuarios.push(cuenta)
                        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
                    }
                    alert("Usuario creado correctamente");
                    e.preventDefault();
                } else {
                    alert("Las contraseñas no coinciden.")
                }
            }
        }
    }
}
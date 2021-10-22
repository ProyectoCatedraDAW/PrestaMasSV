function login() {
    //DECLARACION VARIABLES
    usuario = document.getElementById("usuario").value;
    contra = document.getElementById("contra").value;

    //VALIDACION CAMPOS VACIOS
    if (usuario == "") {
        alert("Complete el campo de usuario.");
    } else {
        if (contra == "") {
            alert("Complete el campo de la contraseña.");
        } else {
            let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].usuario === usuario && usuarios[i].contra === contra) {
                    window.open("html/administracion.html")
                } else {
                    if (usuarios[i].usuario != usuario && usuarios[i].contra != contra) {
                        alert("Credenciales incorrectas. Vuelva a intentarlo.")
                    }
                }
            }
        }
    }
}
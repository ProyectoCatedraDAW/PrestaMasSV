document.addEventListener("DOMContentLoaded", function () {

    if (!Notification) {
        alert("Las notificaciones no se soportan en tu navegador");
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();

});

function notificar() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notification = new Notification("Tienes prestamos que estan a punto de acabar.",
            {
                icon: "data:image/png;base64,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",
                body: "Revisa tus prestamos o dales prorroga."
            }
        );

        notification.onclick = function () {
            window.open("");
        }
    }
}
window.onload = notificar();
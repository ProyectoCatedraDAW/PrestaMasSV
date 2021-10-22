//ANIMACIONES JQUERY PARA ELEMENTOS DE LA PAGINA
$(document).ready(function () {
    $(".document").hide(0).delay(100).fadeIn(1000);
    $("#btn").hover(function () {
        $(this).css("opacity", 0.9);
    });
    $(".btn").hover(function () {
        $(this).css("opacity", 0.9);
    });
});
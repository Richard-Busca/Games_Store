document.addEventListener("DOMContentLoaded",function(){
    var boton_buscar = document.querySelector('#buscar');
    var form_busqueda = document.querySelector('#busqueda');
    var boton_menu = document.querySelector('#menu');
    var menu_principal = document.querySelector('header nav');

    function mostrar_ocultar(elemento) {
        if (elemento.style.display === "block") {
            elemento.style.display = "none";
        } else {
            elemento.style.display = "block";
        }
    };

    boton_buscar.addEventListener("click",function(){
        mostrar_ocultar(form_busqueda);
    });

    boton_menu.addEventListener("click",function(){
        mostrar_ocultar(menu_principal);
    });

    window.addEventListener("resize",function(){
        var ancho_actual = window.innerWidth;
        if(ancho_actual >= 939){
            form_busqueda.style.display = "";
        };
        if(ancho_actual >= 641){
            menu_principal.style.display = "";
        };
    })

})




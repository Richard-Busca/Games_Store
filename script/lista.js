document.addEventListener('DOMContentLoaded', function(){

    var seccion = document.querySelector('#lista_principal');
    var url = "richard_busca.json";
    var pedido = new XMLHttpRequest();
    pedido.open("GET",url);
    pedido.responseType = "json";
    pedido.send();
    var lista;
    var ultimo = document.querySelector('#numero_pagina');

    /* Comportamiento del menu de categorias, colocado acá porque hay dos páginas que no lo tienen */

    var boton_cat = document.querySelector('#cat');
    var categorias = document.querySelector('#menu_principal ul');

    function mostrar_ocultar(elemento) {
        if (elemento.style.display === "block") {
            elemento.style.display = "none";
        } else {
            elemento.style.display = "block";
        }
    };
    boton_cat.addEventListener("click",function(){
        mostrar_ocultar(categorias);
    });
    window.addEventListener("resize",function(){
        var ancho_actual = window.innerWidth;
        if(ancho_actual >= 662){
            categorias.style.display = "";
        };
    });

    pedido.addEventListener("load",function(){
        lista = pedido.response;
        for(var i=0; i<lista.length; i++){
            var articulo_nuevo = crear_art(lista[i]);
            seccion.insertBefore(articulo_nuevo,ultimo);
        };
    });

    function crear_art(elemento){

        var articulo = document.createElement("article");
        var enlace = document.createElement("a");
        var nombre = document.createElement("h3");
        var imagen = document.createElement("img");
        var calificacion = document.createElement("div");
        var precio = document.createElement("div");

        articulo.setAttribute("class","juego");
        enlace.setAttribute("href","juego.html");
        nombre.setAttribute("class","juego_nombre");
        imagen.setAttribute("class","juego_imagen");
        imagen.setAttribute("src", elemento.imagen);
        imagen.setAttribute("alt","imagen de juego "+elemento.nombre);
        calificacion.setAttribute("class","juego_calificacion");
        precio.setAttribute("class","juego_precio");

        nombre.textContent = elemento.nombre;
        calificacion.textContent = "Calificación: "+elemento.calificacion+"/10";
        precio.textContent = "Precio: $"+elemento.precio;

        articulo.appendChild(enlace);
        enlace.appendChild(nombre);
        enlace.appendChild(imagen);
        enlace.appendChild(calificacion);
        enlace.appendChild(precio);

        return articulo;
    };

})




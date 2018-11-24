document.addEventListener("DOMContentLoaded",function(){

    var url = "https://richard-busca.github.io/Games_Store/script/richard_busca.json";
    var pedido = new XMLHttpRequest();
    pedido.open("GET",url);
    pedido.responseType = "json";
    pedido.send();
    var juego;

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
        juego = pedido.response;

        /*****************    Se cargan los datos del json a la página.    ******************/

        var nombre = document.querySelector('#info>h1');
        var categoria = document.querySelector('#info>div');
        var calificacion = document.querySelector('#val');
        var precio = document.querySelector('#precio');
        var descripcion = document.querySelector('#descripcion');
        var imagenes = document.querySelector('#imagenes');
        var portada = document.querySelector('#portada');

        nombre.textContent = juego[0].nombre;
        portada.setAttribute("src",juego[0].portada);
        categoria.textContent = "Categoria: "+juego[0].categoria;
        calificacion.textContent = "Valoración: "+juego[0].calificacion+"/10";
        precio.textContent = "Preio: $"+juego[0].precio;
        descripcion.textContent = juego[0].descripcion;

        for(var i=0; i<juego[0].imagenes_adicionales.length;i++){
            var imagen = document.createElement("img");
            imagen.setAttribute("class","desc");
            imagen.setAttribute("src",juego[0].imagenes_adicionales[i]);
            imagen.setAttribute("alt","Imagen Adicional "+(i+1));
            imagenes.appendChild(imagen);
        };


        /********************** Creacion del proceso de compra *******************************/

        var proceso_compra = document.createElement("div"); //Se crea proceso de compra y colocan atributos
        proceso_compra.setAttribute("id","proceso_compra");

        var formulario_compra = document.createElement("form"); //Se crea formulario de compra
        formulario_compra.setAttribute("id","form_compra");

        var label_cantidad = document.createElement("label"); // Cantidad de Items
        label_cantidad.setAttribute("for","comp_cantidad");
        label_cantidad.textContent = "Cantidad de Copias:";
        var input_cantidad = document.createElement("input");
        input_cantidad.setAttribute("type","number");
        input_cantidad.setAttribute("value","1");
        input_cantidad.setAttribute("min","1");
        input_cantidad.setAttribute("id","comp_cantidad");
        input_cantidad.setAttribute("name","cantidad");
        var cantidad = document.createElement("div");
        cantidad.appendChild(label_cantidad);
        cantidad.appendChild(input_cantidad);

        var label_medio_pago = document.createElement("label"); //Seleccionar Medio de Pago
        label_medio_pago.setAttribute("for","comp_medio");
        label_medio_pago.textContent = "Medio de Pago:";
        var select_medio_pago = document.createElement("select");
        select_medio_pago.setAttribute("name","medio_pago");
        select_medio_pago.setAttribute("id","comp_medio");
        var option_medio1 = document.createElement("option");
        var option_medio2 = document.createElement("option");
        var option_medio3 = document.createElement("option");
        var option_medio4 = document.createElement("option");
        option_medio1.setAttribute("value","paypal");
        option_medio2.setAttribute("value","debito");
        option_medio3.setAttribute("value","credito");
        option_medio4.setAttribute("value","efectivo");
        option_medio1.textContent = "PayPal";
        option_medio2.textContent = "Débito";
        option_medio3.textContent = "Crédito";
        option_medio4.textContent = "Efectivo";
        select_medio_pago.appendChild(option_medio1);
        select_medio_pago.appendChild(option_medio2);
        select_medio_pago.appendChild(option_medio3);
        select_medio_pago.appendChild(option_medio4);
        var medio_de_pago = document.createElement("div");
        medio_de_pago.appendChild(label_medio_pago);
        medio_de_pago.appendChild(select_medio_pago);

        var input_nombre = document.createElement("input"); // Campo para ingresar Nombre
        input_nombre.setAttribute("type","text");
        input_nombre.setAttribute("id","comp_nombre");
        input_nombre.setAttribute("name","nombre");
        input_nombre.setAttribute("placeholder","Nombre...");
        input_nombre.setAttribute("required",true);
        var nombre = document.createElement("div");
        nombre.appendChild(input_nombre);

        var input_email = document.createElement("input"); // Campo para ingresar Email
        var email = document.createElement("div");
        input_email.setAttribute("type","email");
        input_email.setAttribute("name","email");
        input_email.setAttribute("id","comp_email");
        input_email.setAttribute("placeholder","Email...");
        input_email.setAttribute("required",true);
        email.appendChild(input_email);

        var tipo_juego = document.createElement("div"); //Seleccionar Tipo de juego (Digital o Físico)
        var label_tipo = document.createElement("p");
        var tipo_digital = document.createElement("div");
        var tipo_fisico = document.createElement("div");
        var label_digital = document.createElement("label");
        var input_digital = document.createElement("input");
        var label_fisico = document.createElement("label");
        var input_fisico = document.createElement("input");
        label_tipo.textContent = "Desea un juego físico o digital:";
        label_digital.textContent = "Digital"
        label_digital.setAttribute("for","comp_digital");
        input_digital.setAttribute("type","radio");
        input_digital.setAttribute("id","comp_digital");
        input_digital.setAttribute("name","tipo");
        input_digital.setAttribute("checked",true);
        label_fisico.textContent = "Físico";
        label_fisico.setAttribute("for","comp_fisico");
        input_fisico.setAttribute("type","radio");
        input_fisico.setAttribute("id","comp_fisico");
        input_fisico.setAttribute("name","tipo");
        tipo_juego.appendChild(label_tipo);
        tipo_juego.appendChild(tipo_digital);
        tipo_juego.appendChild(tipo_fisico);
        tipo_digital.appendChild(label_digital);
        tipo_digital.appendChild(input_digital);
        tipo_fisico.appendChild(label_fisico);
        tipo_fisico.appendChild(input_fisico);

        var direccion = document.createElement("div"); // Campo para ingresar Direccion
        var input_direccion = document.createElement("input");
        direccion.setAttribute("id","comp_dir");
        direccion.setAttribute("class","ocultar");
        input_direccion.setAttribute("type","text");
        input_direccion.setAttribute("name","direccion");
        input_direccion.setAttribute("id","comp_direccion");
        input_direccion.setAttribute("placeholder","Dirección...");
        direccion.appendChild(input_direccion);

        var tipo_envio = document.createElement("div"); // Seleccionar Tipo de Envio
        tipo_envio.setAttribute("id","comp_envio");
        tipo_envio.setAttribute("class","ocultar");
        var label_envio = document.createElement("p");
        label_envio.textContent = "Método de Envío:";
        var comun = document.createElement("div");
        var especial = document.createElement("div");
        var premium = document.createElement("div");
        var label_comun = document.createElement("label");
        var label_especial = document.createElement("label");
        var label_premium = document.createElement("label");
        var input_comun = document.createElement("input");
        var input_especial = document.createElement("input");
        var input_premium = document.createElement("input");
        label_comun.setAttribute("for","comp_comun");
        label_especial.setAttribute("for","comp_especial");
        label_premium.setAttribute("for", "comp_premium");
        label_comun.textContent = "Común:";
        label_especial.textContent = "Especial:";
        label_premium.textContent = "Premium:";
        input_comun.setAttribute("name","metodo");
        input_especial.setAttribute("name","metodo");
        input_premium.setAttribute("name","metodo");
        input_comun.setAttribute("type","radio");
        input_especial.setAttribute("type","radio");
        input_premium.setAttribute("type","radio");
        input_comun.setAttribute("id","comp_comun");
        input_especial.setAttribute("id","comp_especial");
        input_comun.setAttribute("id","comp_premium");
        input_comun.setAttribute("checked","true")
        comun.appendChild(label_comun);
        comun.appendChild(input_comun);
        especial.appendChild(label_especial);
        especial.appendChild(input_especial);
        premium.appendChild(label_premium);
        premium.appendChild(input_premium);
        tipo_envio.appendChild(label_envio);
        tipo_envio.appendChild(comun);
        tipo_envio.appendChild(especial);
        tipo_envio.appendChild(premium);

        formulario_compra.appendChild(cantidad); //Armo el formulario de compra con los objetos creados anteriormente
        formulario_compra.appendChild(medio_de_pago);
        formulario_compra.appendChild(nombre);
        formulario_compra.appendChild(email);
        formulario_compra.appendChild(tipo_juego);
        formulario_compra.appendChild(direccion);
        formulario_compra.appendChild(tipo_envio);

        proceso_compra.appendChild(formulario_compra); 

        var desglose = document.createElement("div"); // Creo elemento donde se mostrara el desglose
        desglose.setAttribute("id","comp_desg");

        var etiqueta_items = document.createElement("label"); // Creo campos del desglose
        var etiqueta_envio = document.createElement("label");
        var etiqueta_impuesto = document.createElement("label");
        var etiqueta_total = document.createElement("label");
        var muestro_items = document.createElement("p");
        var muestro_envio = document.createElement("p");
        var muestro_impuesto = document.createElement("p");
        var muestro_total = document.createElement("p");
        var boton_cancelar = document.createElement("button"); // Boton de cancelar
        var boton_confirmar = document.createElement("button"); // Boton de confirmar la compra
        etiqueta_items.textContent = "Items";
        etiqueta_envio.textContent = "Envio:";
        etiqueta_impuesto.textContent = "Impuesto:";
        etiqueta_total.textContent = "Total:";
        muestro_items.setAttribute("id","comp_items");
        muestro_envio.setAttribute("id","mostrar_envio");
        muestro_impuesto.setAttribute("id","comp_imp");
        muestro_total.setAttribute("id","comp_total");
        muestro_envio.textContent = "$0";
        boton_cancelar.setAttribute("type","button");
        boton_cancelar.setAttribute("id","comp_cancelar");
        boton_confirmar.setAttribute("type","submit");
        boton_confirmar.setAttribute("id","comp_comprar");
        boton_confirmar.setAttribute("form","form_compra");
        boton_cancelar.textContent = "Cancelar";
        boton_confirmar.textContent = "Comprar";

        desglose.appendChild(etiqueta_items);
        desglose.appendChild(muestro_items);
        desglose.appendChild(etiqueta_envio);
        desglose.appendChild(muestro_envio);
        desglose.appendChild(etiqueta_impuesto);
        desglose.appendChild(muestro_impuesto);
        desglose.appendChild(etiqueta_total);
        desglose.appendChild(muestro_total);
        desglose.appendChild(boton_cancelar);
        desglose.appendChild(boton_confirmar);
        proceso_compra.appendChild(desglose); //Agrego el desglose al proceso de compra

        var compra_exitosa = document.createElement("div");
        compra_exitosa.setAttribute("id","compra_exitosa");
        compra_exitosa.setAttribute("data-mostrandose",false);
        var boton_cerrar = document.createElement("button");
        var imagen_cerrar = document.createElement("img");
        imagen_cerrar.setAttribute("src","img/cerrar.png");
        var parr_compra = document.createElement("p");
        parr_compra.textContent = "¡Su compra fue exitosa!";
        boton_cerrar.appendChild(imagen_cerrar);
        compra_exitosa.appendChild(boton_cerrar);
        compra_exitosa.appendChild(parr_compra);


        var items_num = juego[0].precio; // Coloco en el desglose los valores iniciados
        var envio_num = 0;
        var impuesto_num = items_num*0.22;
        var total_num = items_num + envio_num+impuesto_num;
        var main = document.querySelector('main');
        var sig_elemento = document.querySelector('#menu_principal'); 
        var boton_comprar = document.querySelector('#comprar>button');

        boton_comprar.addEventListener("click",function(){ // Se inicia el proceso de compra al clickear el boton de comprar.
            items_num = juego[0].precio;
            envio_num = 0;
            impuesto_num = items_num*0.22;
            total_num = items_num + envio_num+impuesto_num;
            muestro_items.textContent =1+" x $"+juego[0].precio+": $"+juego[0].precio;
            muestro_envio.textContent ="$"+envio_num;
            muestro_impuesto.textContent ="$"+impuesto_num;
            muestro_total.textContent = "$"+total_num;
            main.insertBefore(proceso_compra,sig_elemento);
            window.scrollTo(0,0); // Hace scroll al inicio de la pagina
        });

        boton_cerrar.addEventListener("click",function(){ // Boton de cerrar en cartel de compra exitosa
            main.removeChild(compra_exitosa);
            compra_exitosa.setAttribute("data-mostrandose",false);
        });
        
        function costo_envio(costo, comun, especial){ //Utilizo esta funcion para calcular el costo del envio
            var resultado = 0;
            if(comun.checked){
                resultado = costo * 0.005;
            } else {
                if (especial.checked){
                    resultado = costo * 0.02;
                } else{
                    resultado = costo * 0.05;
                }
            };
            return resultado;
        };

        input_cantidad.addEventListener("change",function(){ // Cambio de cantidad de articulos
            items_num = parseInt(input_cantidad.value)*juego[0].precio;
            if(input_fisico.checked){
                envio_num = costo_envio(items_num,input_comun,input_especial);
            } else {
                envio_num = 0;
            };
            impuesto_num = (items_num+envio_num)*0.22;
            total_num = items_num+envio_num+impuesto_num;
            muestro_items.textContent = input_cantidad.value+" x "+juego[0].precio+": $"+items_num;
            muestro_impuesto.textContent = "$"+impuesto_num;
            muestro_envio.textContent = "$"+envio_num;
            muestro_total.textContent= "$"+total_num;
        });

        input_digital.addEventListener("change",function(){ // Selecciono tipo digital
            if (input_digital.checked){
                envio_num = 0;
                muestro_envio.textContent = "$0";
                impuesto_num = items_num * 0.22;
                total_num = items_num+impuesto_num;
                muestro_impuesto.textContent="$"+impuesto_num;
                muestro_total.textContent="$"+total_num;
                direccion.setAttribute("class","ocultar");
                tipo_envio.setAttribute("class","ocultar");
                input_direccion.removeAttribute("required");
            };
        });

        input_fisico.addEventListener("change",function(){ // Selecciono tipo fisico
            if(input_fisico.checked){
                envio_num = costo_envio(items_num,input_comun,input_especial);
                total_num = items_num+impuesto_num+envio_num;
                muestro_envio.textContent="$"+envio_num;
                muestro_total.textContent="$"+total_num;
                direccion.removeAttribute("class");
                tipo_envio.removeAttribute("class");
                input_direccion.setAttribute("required",true);

            };
        });

        input_comun.addEventListener("change",function(){ // Selecciono tipo de envio comun
            if(input_comun.checked){
                envio_num = items_num*0.005;
                total_num= items_num+impuesto_num+envio_num;
                muestro_envio.textContent="$"+envio_num;
                muestro_total.textContent="$"+total_num;
            }
        });

        input_especial.addEventListener("change",function(){ // Selecciono tipo de envio especial
            if(input_especial.checked){
                envio_num = items_num*0.02;
                total_num= items_num+impuesto_num+envio_num;
                muestro_envio.textContent="$"+envio_num;
                muestro_total.textContent="$"+total_num;
            }
        });

        input_premium.addEventListener("change",function(){ // Selecciono tipo de envio premium
            if(input_premium.checked){
                envio_num = items_num*0.05;
                total_num= items_num+impuesto_num+envio_num;
                muestro_envio.textContent="$"+envio_num;
                muestro_total.textContent="$"+total_num;
            }
        });

        boton_cancelar.addEventListener("click",function(){ // Evento de cancelar el proceso de compra
            direccion.setAttribute("class","ocultar");
            tipo_envio.setAttribute("class","ocultar");
            formulario_compra.reset();
            main.removeChild(proceso_compra);
        });

        window.addEventListener("resize",function(){ //Evento que ubica el cartel de compra exitosa si cambio el tamaño de la ventana
            if(compra_exitosa.getAttribute("data-mostrandose")){
                var ancho_actual = window.innerWidth;
                var alto_actual = window.innerHeight;
                if (ancho_actual >= 380){
                    compra_exitosa.setAttribute("class","compra_grande"); // Si la pantalla es grande uso tamaño de cartel grande
                    compra_exitosa.style.left = ((ancho_actual-366)/2)+"px";
                    compra_exitosa.style.top = ((alto_actual-200)/2)+"px";
                } else {
                    compra_exitosa.setAttribute("class","compra_chica"); // De lo contrario uso un tamaño chico
                    compra_exitosa.style.left = ((ancho_actual-266)/2)+"px";
                    compra_exitosa.style.top = ((alto_actual-200)/2)+"px";
                };
            };
        });

        boton_confirmar.addEventListener("click",function(e){ // Confirmar la compra
            var dir_valido = true;
            if(input_fisico.checked){
                dir_valido = input_direccion.validity.valid;
            };
            if(input_nombre.validity.valid && input_email.validity.valid && dir_valido){ // Valido el formulario para saber si es valido lo oculto.
                e.preventDefault;
                var ancho = window.innerWidth;
                var alto = window.innerHeight;
                alto = (alto-200)/2;
                if(ancho>=380){
                    ancho = (ancho-366)/2;
                    compra_exitosa.setAttribute("class","compra_grande");
                }else{
                    ancho = (ancho-266)/2;
                    compra_exitosa.setAttribute("class","compra_chica");
                };
                direccion.setAttribute("class","ocultar");
                tipo_envio.setAttribute("class","ocultar");
                formulario_compra.reset();
                main.removeChild(proceso_compra);
                main.insertBefore(compra_exitosa,sig_elemento); //Muestro el cartel de compra exitosa
                compra_exitosa.setAttribute("data-mostrandose",true);
                compra_exitosa.style.left = ancho+"px";
                compra_exitosa.style.top = alto+"px";
            };
        });
    })


})

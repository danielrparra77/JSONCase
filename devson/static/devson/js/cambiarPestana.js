function cambiarPestanna(pestanas, pestana) {
    pestana = document.getElementById(pestana.id);
    listaPestanas = document.getElementById(pestanas.id);
    cpestana = document.getElementById('c' + pestana.id);
    listacPestanas = document.getElementById('contenido' + pestanas.id);
    i = 0;
    while (typeof listacPestanas.getElementsByTagName('div')[i] !== 'undefined') {
        $(document).ready(function () {
            $(listacPestanas.getElementsByTagName('div')[i]).css('display', 'none');
            $(listaPestanas.getElementsByTagName('li')[i]).css('background', '');
            $(listaPestanas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }

    $(document).ready(function () {
        $(cpestana).css('display', '');
        $(pestana).css('background', '#434343');
        $(pestana).css('padding-bottom', '2px');
    });
}

function letra() {
    lista = document.tipoTexto.fuente;
    elegido = lista.selectedIndex;
    opcion = lista.options[elegido];
    fuente = opcion.value;
    texto = opcion.text;
    escribe = document.getElementById("texto");
    escribe.style.fontFamily = fuente;
}

function tamanol() {
    lista = document.tipoTexto.tamano;
    elegido = lista.selectedIndex;
    opcion = lista.options[elegido];
    tamano = opcion.value;
    texto = opcion.text;
    escribe = document.getElementById("texto");
    escribe.style.fontSize = tamano + "px";
}

function color() {
    lista = document.getElementById("colort");
    elegido = lista.value;
    escribe = document.getElementById("texto");
    escribe.style.color = elegido;
}

function colorl() {
    lista = document.getElementById("colorli");
    lista2 = document.tipocompuesto.grosor;

    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    tamano = opcion.value;
    elegido = lista.value;
    escribe = document.getElementById("ejem1");
    escribe.style.border = tamano + 'px solid ' + elegido;
}

function colorr() {
    lista = document.getElementById("colorre");
    elegido = lista.value;
    escribe = document.getElementById("ejem1");
    escribe.style.background = elegido;
}

function colorls() {
    lista = document.getElementById("colorlis");
    lista2 = document.tiposimple.grosors;
    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    tamano = opcion.value;
    elegido = lista.value;
    escribe = document.getElementById("ejem2");
    escribe.style.border = tamano + 'px solid ' + elegido;
}

function colorrs() {
    lista = document.getElementById("colorres");
    elegido = lista.value;
    escribe = document.getElementById("ejem2");
    escribe.style.background = elegido;
}

function colorll() {
    lista = document.getElementById("colorlil");
    lista2 = document.tipolinea.grosorl;
    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    tamano = opcion.value;
    elegido = lista.value;
    escribe = document.getElementById("ejem3");
    escribe.style.background = elegido;
    escribe.style.height = tamano + 'px'; 
}
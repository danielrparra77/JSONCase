var socket = io.connect('http://localhost:8010/');
//      
socket.on('connect', function(){
    console.log("connect");
});

var grolineacomp='0',collineacomp='#070707',colfondcomp='#070707';
var grolineasm='0',collineasim='#070707',colfondsim='#070707';
var grolinea='0',colorlinea='#070707';
var fuente='arial',tamanofuente='10',colorfuente='#070707';

var idsock = '';
function getidsock() {
    return idsock;
}
function setidsock(n){
    idsock = n;
}

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
        
        $("#enviarestilocompuesto").click(function(){
            
            socket.emit('enviar estilo',colfondcomp,collineacomp,grolineacomp,'','','Compuesto',getidsock());
            //setTimeout(function () {
                console.log("estilo compuesto");
            //    window.close();  
            //}, 500);
        });
        $("#enviarestilosimple").click(function(){
            
            socket.emit('enviar estilo',colfondsim,collineasim,grolineasm,'','','Simple',getidsock());
//            setTimeout(function () {
                console.log("estilo simple");
//                window.close();  
//            }, 500);
        });
        $("#enviarestiloflecha").click(function(){
            
            socket.emit('enviar estilo',colorlinea,'',grolinea,'','','Linea',getidsock());
//            setTimeout(function () {
                console.log("estilo linea");
//                window.close();  
//            }, 500);
        });
        $("#enviarestiloletra").click(function(){
            
            socket.emit('enviar estilo',colorfuente,'','',tamanofuente,fuente,'Texto',getidsock());
//            setTimeout(function () {
                console.log("estilo letra");
//                window.close();  
//            }, 500);
        });
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
    tamanofuente = opcion.value;
    texto = opcion.text;
    escribe = document.getElementById("texto");
    escribe.style.fontSize = tamanofuente + "px";
}

function color() {
    lista = document.getElementById("colort");
    colorfuente = lista.value;
    escribe = document.getElementById("texto");
    escribe.style.color = colorfuente;
}

function colorl() {
    lista = document.getElementById("colorli");
    lista2 = document.tipocompuesto.grosor;

    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    grolineacomp = opcion.value;
    collineacomp = lista.value;
    escribe = document.getElementById("ejem1");
    escribe.style.border = grolineacomp + 'px solid ' + collineacomp;
}

function colorr() {
    lista = document.getElementById("colorre");
    colfondcomp = lista.value;
    escribe = document.getElementById("ejem1");
    escribe.style.background = colfondcomp;
}

function colorls() {
    lista = document.getElementById("colorlis");
    lista2 = document.tiposimple.grosors;
    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    grolineasm = opcion.value;
    collineasim = lista.value;
    escribe = document.getElementById("ejem2");
    escribe.style.border = grolineasm + 'px solid ' + collineasim;
}

function colorrs() {
    lista = document.getElementById("colorres");
    colfondsim = lista.value;
    escribe = document.getElementById("ejem2");
    escribe.style.background = colfondsim;
}

function colorll() {
    lista = document.getElementById("colorlil");
    lista2 = document.tipolinea.grosorl;
    elegido2 = lista2.selectedIndex;
    opcion = lista2.options[elegido2];
    grolinea = opcion.value;
    colorlinea = lista.value;
    escribe = document.getElementById("ejem3");
    escribe.style.background = colorlinea;
    escribe.style.height = grolinea + 'px'; 
}

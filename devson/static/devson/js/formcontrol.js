/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var objetoseleccionado = '';
var idnodocreado = 0; //se usara para diferenciar todos los nodos graficados entre si en su caracteristica de id
var nodoscreados = [];
var endpoints = [];
var nombreproyecto = '';
var usuarioconectado = '';


//valores necesarios para crear objetos json a partir de los estilos
var paraestilo = new Array();
paraestilo[0] = "fondonodo";
paraestilo[1] = "colorlineanodo";
paraestilo[2] = "grosornodo";
paraestilo[3] = "fondohoja";
paraestilo[4] = "colorlineahoja";
paraestilo[5] = "grosorhoja";
paraestilo[6] = "fuenteletra";
paraestilo[7] = "colorfuente";
paraestilo[8] = "tamanofuente";
paraestilo[9] = "grosorconexion";
paraestilo[10] = "colorconexion";
var estilo = new Object();
estilo.fondonodo = '#ffffff';

function reiniciarnodos(){
    nodoscreados = [];
    endpoints = []; 
}

function setfondonodo(n) {
    estilo.fondonodo = n;
}
function getfondonodo() {
    return estilo.fondonodo;
}
estilo.colorlineanodo = '#020202';
function setcolorlineanodo(n) {
    estilo.colorlineanodo = n;
}
function getcolorlineanodo() {
    return estilo.colorlineanodo;
}
estilo.grosornodo = '1';
function setgrosornodo(n) {
    estilo.grosornodo = n;
}
function getgrosornodo() {
    return estilo.grosornodo;
}
estilo.fondohoja = '#ffffff';
function setfondohoja(n) {
    estilo.fondohoja = n;
}
function getfondohoja() {
    return estilo.fondohoja;
}
estilo.colorlineahoja = '#020202';
function setcolorlineahoja(n) {
    estilo.colorlineahoja = n;
}
function getcolorlineahoja() {
    return estilo.colorlineahoja;
}
estilo.grosorhoja = '1';
function setgrosorhoja(n) {
    estilo.grosorhoja = n;
}
function getgrosorhoja() {
    return estilo.grosorhoja;
}
estilo.fuenteletra = 'arial';
function setfuenteletra(n) {
    estilo.fuenteletra = n;
}
function getfuenteletra() {
    return estilo.fuenteletra;
}
estilo.colorfuente = '#020202';
function setcolorfuente(n) {
    estilo.colorfuente = n;
}
function getcolorfuente() {
    return estilo.colorfuente;
}
estilo.tamanofuente = '10';
function settamanofuente(n) {
    estilo.tamanofuente = n;
}
function gettamanofuente() {
    return estilo.tamanofuente;
}
estilo.grosorconexion = '3';
function setgrosorconexion(n) {
    estilo.grosorconexion = n;
}
function getgrosorconexion() {
    return estilo.grosorconexion;
}
estilo.colorconexion = '#020202';
function setcolorconexion(n) {
    estilo.colorconexion = n;
}
function getcolorconexion() {
    return estilo.colorconexion;
}
//valores necesarios para rear objetos json a partir de ls graficas
var paranodo = new Array();
paranodo[0] = "idnodo";
paranodo[1] = "x";
paranodo[2] = "y";
paranodo[3] = "idhijos";
paranodo[4] = "caracteristica";
paranodo[5] = "tiponodo";//aunque en los parametros se digan  tiponodo los usuarios pensaran que es el nombre del nodo
paranodo[6] = "valor";
paranodo[7] = "padre";

function getproyecto(){
    return JSON.stringify(nodoscreados,paranodo);;
}

function insertarobject(x) {
    objetoseleccionado = x;
}

function getusuarioactivo(){
    return usuarioconectado;
}

//Funcion usada para actualizar el nuevo proyecto
function setnombreproyecto(nuevo, usuario) {
    nombreproyecto = nuevo;
    usuarioconectado = usuario;
}

//Funcion para agregar los objetos endpoints
function agregarendpoint(nuevoendpoint) {
    endpoints.push(nuevoendpoint);
}

//Funcion para organizar vistas de los iframe creados por el usuario
function mostrarIframe(id) {
    if (document.getElementById(id).style.visibility == "hidden")
        document.getElementById(id).style.visibility = "visible";
    else
        document.getElementById(id).style.visibility = "hidden";
}

//Funcion usada para agregar un nodo la la lista de nodos, x y y indican cual es la posicion en la que se encuantran
//la caracteristica dice si el nodo es nodo o si es hoja
function agregarnodo(idnodo, y, x, caracteristica,tiponodo,valor) {
    var nuevonodo = new Object();
    nuevonodo.idnodo = idnodo;
    nuevonodo.x = x;
    nuevonodo.y = y;
    nuevonodo.idhijos = [];
    nuevonodo.caracteristica = caracteristica;
    if (tiponodo !='no hay tipo')
        nuevonodo.tiponodo = tiponodo;
    else
        nuevonodo.tiponodo = '';
    nuevonodo.valor = valor;
    nuevonodo.padre = '';
    nodoscreados.push(nuevonodo);
    $(function () {
        $('#jsonview').jsonView(nodoscreados, {"status": "close"});
    });
}

//Funcion usada para que el padre sepa que hijo acaba de tener
function unirpadreahijo(idpadre, idhijo) {
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idpadre) {
            //alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.idhijos.push(idhijo);
            console.log(nodo.idnodo + " mis hijos " + nodo.idhijos);
        }
        if (nodo.idnodo == idhijo) {
            //alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.padre = idpadre;
        }
    });
    $(function () {
        $('#jsonview').jsonView(nodoscreados, {"status": "close"});
    });
}

//Funcion usada para separar a un padre con su hijo
function separarpadrehijo(idpadre, idhijo) {
    var it = 0;
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idpadre) {
            nodo.idhijos.splice(it, 1);
            console.log(nodo.idnodo + " mis hijos " + nodo.idhijos);
        }
        if (nodo.idnodo == idhijo) {
            //alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.padre = '';
        }
        it += 1;
    });
    $(function () {
        $('#jsonview').jsonView(nodoscreados, {"status": "close"});
    });
}

//Funcion usada para accrutalizar las posiciones de los nodos
function actualizarposicionnodo(idnodo, posx, posy) {
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idnodo) {
            nodo.x = posx;
            nodo.y = posy;
        }
    });
    $(function () {
        $('#jsonview').jsonView(nodoscreados, {"status": "close"});
    });
}

function getnodo(idnodo){
    var nodoencontrado = null;
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idnodo) {
            nodoencontrado = nodo;
        }
    });
    return nodoencontrado;
}

//Uso de Sockets para comunicarse con otras paginas como los casos de los iframe

var socket = io.connect('http://localhost:8010/');
var idsocket = '';
//      
socket.on('connect', function () {
    console.log("connect");
    idsocket = socket.io.engine.id;
    console.log("id socket "+idsocket);
});

function getidsocket(){
    return idsocket;
}

//En esta funcion se preparara al modal informandole de los datos actuales del nodo
function mostrarmodal(idnodo) {
    var retorono = false;
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idnodo) {
            $(function () {
                $('#idnodoeditando').val(idnodo);
                $('#tipo').val(nodo.tiponodo);
                $('#valor').prop( "disabled", false );
                $('#valor').val(nodo.valor);
                retorono = true;
            });
        }
    });
    return retorono;
}

function editarnombregraficoproyecto() {
    $(function () {
        var para = document.createElement("b");
        var node = document.createTextNode("Proyeto:");
        var nombreproyec = document.createTextNode(nombreproyecto);
        para.appendChild(node);
        $('#nomproyectoderecha').empty();
        var nombre = document.getElementById("nomproyectoderecha");
        nombre.appendChild(para);
        nombre.appendChild(nombreproyec);
        //$('#nomproyectoderecha').text(nombreproyecto);
    });
}

$(document).ready(function () {
    $("#enviar").click(function () {
        var idnodo = $('#idnodoeditando').val();
        //alert("enviando "+idnodo);
        nodoscreados.forEach(function (nodo) {
            if (nodo.idnodo == idnodo) {
                nodo.tiponodo = $('#tipo').val();
                nodo.valor = $('#valor').val();
                cambiarnombretiponodo(idnodo, nodo.tiponodo);
            }
        });
    });
    $("#guardarproyecto").click(function () {
        setTimeout(function () {
            console.log('Se enviara proyecto a guardar: ' + nombreproyecto + " de " + usuarioconectado);
            //socket.emit('enviar proyecto', nodoscreados, paranodo, estilo, paraestilo, nombreproyecto, usuarioconectado);
        }, 1100);
    });

    $('#postguardar').submit(function(e) {
        if (!sintaxisnodos())
            return false;
        else{
        //setTimeout(function () {
        var stringproyecto = JSON.stringify(nodoscreados,paranodo);
        var stringestilo = JSON.stringify(estilo,paraestilo);
        //alert('q pasa '+nodoscreados+" "+paranodo+" "+JSON.stringify(nodoscreados,paranodo));
            $(this).append('<input type="hidden" name="nodoscreados" value='+stringproyecto+' />');
            $(this).append('<input type="hidden" name="estilo" value='+stringestilo+' />');
            $(this).append('<input type="hidden" name="nombreproyecto" value="'+nombreproyecto+'" />');
            $(this).append('<input type="hidden" name="usuarioconectado" value="'+usuarioconectado+'" />');
            return true;
        //}, 800);
        }
    });
    
});



//Esta funcion cambiara graficamente el tipo de nodo en la grafica
function cambiarnombretiponodo(idnodo, tiponodo) {
    $(function () {
        $("#" + idnodo + ">.nombrenodo").empty("nombrenodo");
        $("#" + idnodo + ">.nombrenodo").html(tiponodo);
//        nombrenodo = $("<span>", {
//                "class": "nombrenodo",
//            }).html(tiponodo);
//        nombrenodo.appendTo($("#"+idnodo));
        //$('#nomproyectoderecha').text(nombreproyecto);
    });
}

//Esta funcion verifica si no hay inconvenientes en la estructura creada
function sintaxisnodos(){
    r = true;
    var nombresnodos = [];
    //alert(nodoscreados.length+" tamano");
    nodoscreados.forEach(function (nodo) {
        nombresnodos.push(nodo.tiponodo);
    });
    if (hasDuplicates(nombresnodos)){
        alert('favor revisar los nombres de los nodos, que no existan nombres iguales');
        r = false;
    }
    return r;
}

function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

//
//socket.on('enviar propiedades actualizadas a cliente', function(node) {
//    var it = 0;
//    nodoscreados.forEach(function(nodo) {
//        if (nodo.idnodo==node.idnodo){
//            alert("he recibido propieades "+node+"tipo: "+node.tiponodo+" valor: "+node.valor);
//            nodo = node;
//            nodoscreados[it] = node;
//        }
//        it++;
//    });
//    mostrarIframe("frame"+node.idnodo);
//});
//
//socket.on('cancelar iframe', function(idnodo){
//    mostrarIframe("frame"+idnodo);
//});
//
//function enviarpropiedades(idnodo){
//    nodoscreados.forEach(function(nodo) {
//        if (nodo.idnodo==idnodo){
//            socket.emit('enviar propiedades nodo', nodo);
//        } 
//    });
//}

//$(function() {
//$( "#draggable" ).draggable({ cursor: "move", cursorAt: { top: 56, left: 56 } });
//$( "#draggable2" ).draggable({ cursor: "crosshair", cursorAt: { top: -5, left: -5 } });
//$( "#draggable3" ).draggable({ cursorAt: { bottom: 0 } }); existe la funcion resizable() para despues
//$( ".ui-widget-content" ).draggable({ containment: "#containment-wrapper", scroll: true });
//$('#containment-wrapper').scrollTop(200);
//});

//$(document).ready(function(){

//});

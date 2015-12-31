/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var objetoseleccionado = '';
var idnodocreado = 0; //se usara para diferenciar todos los nodos graficados entre si en su caracteristica de id
var nodoscreados = [];

                    
function insertarobject(x){
    objetoseleccionado = x;
}

//Funcion para organizar vistas de los iframe creados por el usuario
function mostrarIframe(id){
    if (document.getElementById(id).style.visibility=="hidden")
        document.getElementById(id).style.visibility="visible";
    else
        document.getElementById(id).style.visibility="hidden";
}

//Funcion usada para agregar un nodo la la lista de nodos, x y y indican cual es la posicion en la que se encuantran
function agregarnodo(idnodo,y,x){
    var nuevonodo = new Object();
    nuevonodo.idnodo = idnodo;
    nuevonodo.x = x;
    nuevonodo.y = y;
    nuevonodo.idhijos=[];
    nuevonodo.tiponodo='';
    nuevonodo.valor = '';
    nodoscreados.push(nuevonodo);
}

//Funcion usada para que el padre sepa que hijo acaba de tener
function unirpadreahijo(idpadre,idhijo){
    nodoscreados.forEach(function(nodo) {
        if (nodo.idnodo==idpadre){
            alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.idhijos.push(idhijo);
        } });
}
//En esta funcion se preparara al modal informandole de los datos actuales del nodo
function mostrarmodal(idnodo){
    nodoscreados.forEach(function(nodo) {
        if (nodo.idnodo==idnodo){
            $(function(){
                $('#idnodoeditando').val(idnodo);
                $('#tipo').val(nodo.tiponodo);
                $('#valor').val(nodo.valor);
            });
        } 
    });
}

$(document).ready(function(){
    $("#enviar").click(function(){
        var idnodo = $('#idnodoeditando').val();
        //alert("enviando "+idnodo);
        nodoscreados.forEach(function(nodo) {
            if (nodo.idnodo==idnodo){
                nodo.tiponodo = $('#tipo').val();
                nodo.valor = $('#valor').val();
            } 
        });          
    });
});

//Uso de Sockets para comunicarse con otras paginas como los casos de los iframe

//var socket = io.connect('http://localhost:8010/');
//      
//socket.on('connect', function(){
//    console.log("connect");
//});
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
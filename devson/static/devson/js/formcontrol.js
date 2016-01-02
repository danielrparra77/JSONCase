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
//valores necesarios para rear objetos json a partir de ls graficas
var paranodo = new Array();
paranodo[0] = "idnodo";
paranodo[1] = "x";
paranodo[2] = "y";
paranodo[3] = "idhijos";
paranodo[4] = "caracteristica";
paranodo[5] = "tiponodo";
paranodo[6] = "valor";
                    
function insertarobject(x){
    objetoseleccionado = x;
}
//Funcion usada para actualizar el nuevo proyecto
function setnombreproyecto(nuevo,usuario){
    nombreproyecto = nuevo;
    usuarioconectado = usuario;
}

//Funcion para agregar los objetos endpoints
function agregarendpoint(nuevoendpoint){
    endpoints.push(nuevoendpoint);
}

//Funcion para organizar vistas de los iframe creados por el usuario
function mostrarIframe(id){
    if (document.getElementById(id).style.visibility=="hidden")
        document.getElementById(id).style.visibility="visible";
    else
        document.getElementById(id).style.visibility="hidden";
}

//Funcion usada para agregar un nodo la la lista de nodos, x y y indican cual es la posicion en la que se encuantran
//la caracteristica dice si el nodo es nodo o si es hoja
function agregarnodo(idnodo,y,x,caracteristica){
    var nuevonodo = new Object();
    nuevonodo.idnodo = idnodo;
    nuevonodo.x = x;
    nuevonodo.y = y;
    nuevonodo.idhijos=[];
    nuevonodo.caracteristica=caracteristica;
    nuevonodo.tiponodo='';
    nuevonodo.valor = '';
    nodoscreados.push(nuevonodo);
}

//Funcion usada para que el padre sepa que hijo acaba de tener
function unirpadreahijo(idpadre,idhijo){
    nodoscreados.forEach(function(nodo) {
        if (nodo.idnodo==idpadre){
            //alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.idhijos.push(idhijo);
        } });
}


//Uso de Sockets para comunicarse con otras paginas como los casos de los iframe

var socket = io.connect('http://localhost:8010/');
//      
socket.on('connect', function(){
    console.log("connect");
});

//En esta funcion se preparara al modal informandole de los datos actuales del nodo
function mostrarmodal(idnodo){
    var retorono = false;
    nodoscreados.forEach(function(nodo) {
        if (nodo.idnodo==idnodo && nodo.caracteristica=='Hoja'){
            $(function(){
                $('#idnodoeditando').val(idnodo);
                $('#tipo').val(nodo.tiponodo);
                $('#valor').val(nodo.valor);
                retorono = true;
            });
        }
    });
    return retorono;
}

function editarnombregraficoproyecto (){
    $(function(){
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

$(document).ready(function(){
    $("#enviar").click(function(){
        var idnodo = $('#idnodoeditando').val();
        //alert("enviando "+idnodo);
        nodoscreados.forEach(function(nodo) {
            if (nodo.idnodo==idnodo){
                nodo.tiponodo = $('#tipo').val();
                nodo.valor = $('#valor').val();
                cambiarnombretiponodo(idnodo,nodo.tiponodo);
            } 
        });          
    });
    $("#guardarproyecto").click(function(){
        setTimeout(function () {
            console.log('Se enviara proyecto a guardar: ');
            socket.emit('enviar proyecto',nodoscreados,paranodo,nombreproyecto,usuarioconectado);  
        }, 1100);        
    });
});



//Esta funcion cambiara graficamente el tipo de nodo en la grafica
function cambiarnombretiponodo(idnodo,tiponodo){
    $(function(){
        $("#"+idnodo+">.nombrenodo").empty("nombrenodo");
        $("#"+idnodo+">.nombrenodo").html(tiponodo);
//        nombrenodo = $("<span>", {
//                "class": "nombrenodo",
//            }).html(tiponodo);
//        nombrenodo.appendTo($("#"+idnodo));
        //$('#nomproyectoderecha').text(nombreproyecto);
    });
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
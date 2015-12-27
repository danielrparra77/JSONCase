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

//$(function() {
  //$( "#draggable" ).draggable({ cursor: "move", cursorAt: { top: 56, left: 56 } });
  //$( "#draggable2" ).draggable({ cursor: "crosshair", cursorAt: { top: -5, left: -5 } });
  //$( "#draggable3" ).draggable({ cursorAt: { bottom: 0 } }); existe la funcion resizable() para despues
  //$( ".ui-widget-content" ).draggable({ containment: "#containment-wrapper", scroll: true });
  //$('#containment-wrapper').scrollTop(200);
//});

//$(document).ready(function(){
    
//});
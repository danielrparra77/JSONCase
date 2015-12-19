/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var objetoseleccionado = '';
var idnodocreado = 0; //se usara para diferenciar todos los nodos graficados entre si en su caracteristica de id

function insertarobject(x){
    objetoseleccionado = x;
}

$(function() {
  //$( "#draggable" ).draggable({ cursor: "move", cursorAt: { top: 56, left: 56 } });
  //$( "#draggable2" ).draggable({ cursor: "crosshair", cursorAt: { top: -5, left: -5 } });
  //$( "#draggable3" ).draggable({ cursorAt: { bottom: 0 } }); existe la funcion resizable() para despues
  $( ".ui-widget-content" ).draggable({ containment: "#containment-wrapper", scroll: true });
  $('#containment-wrapper').scrollTop(200);
});

$(document).ready(function(){
    $('#containment-wrapper').click(function(e){
        //falta revisar como obtener las coordenadas correctas del evento
        var x = e.pageX-$(this).position().left-$(this).offset().left;
        var y = e.pageY-$(this).position().top-$(this).offset().top;
        if (String(objetoseleccionado)=='Nodo' || String(objetoseleccionado)=='Hoja'){
            newDiv = $("<div/>", {
                "class": "ui-widget-content",
                 "id": "nodo"+idnodocreado,
            });
            newDiv.draggable()
            .appendTo("#containment-wrapper");
            //newDiv.animate({ left: x+'px',top: y+'px' });
//            newImg = $("<img>", {
//                "class": "imagenFondo",
//                "src": "{% static 'devson/images/proyecto/"+String(objetoseleccionado)+".png' %}",
//            });
//            newImg.appendTo(newDiv);
            
            nombrenodo = $("<span>", {
                "class": "nombrenodo",
            }).html('nuevonodo');
            nombrenodo.appendTo(newDiv);
            
            agregarpuntosdefinanodo("nodo"+idnodocreado);
            objetoseleccionado='';
            idnodocreado=idnodocreado+1;
        }
    });
});
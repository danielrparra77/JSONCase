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
//$(function () {
//    getundoredo().add({
//        undo: function() {
//            alert("undo");
//        },
//        redo: function() {
//            alert("redo");
//        }
//    });
//});

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

function reiniciarnodos() {
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

function getproyecto() {
    return JSON.stringify(nodoscreados, paranodo);
    ;
}

function getproyectopanel() {
    var nodospanel = jQuery.extend(true, {}, nodoscreados);
    nodospanel.forEach(function (nodo) {
        if (nodo.caracteristica == 'Hoja' && nodo.tiponodo == '') {
            nodo.tiponodo = 'no hay tipo';
        }
        if (nodo.caracteristica == 'Nodo' && nodo.tiponodo == '') {
            nodo.tiponodo = 'no hay tipo';
        }
    });
    return JSON.stringify(nodospanel, paranodo);

}

function insertarobject(x) {
    objetoseleccionado = x;
}

function getusuarioactivo() {
    return usuarioconectado;
}

function getnombreproyecto() {
    return nombreproyecto;
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
var ihp = 0;
//Funcion usada para agregar un nodo la la lista de nodos, x y y indican cual es la posicion en la que se encuantran
//la caracteristica dice si el nodo es nodo o si es hoja
function agregarnodo(idnodo, y, x, caracteristica, tiponodo, valor) {
    var nuevonodo = new Object();
    var pasoact = new Object();
    nuevonodo.idnodo = idnodo;
    nuevonodo.x = x;
    nuevonodo.y = y;
    nuevonodo.idhijos = [];
    nuevonodo.caracteristica = caracteristica;
    if (tiponodo != 'no hay tipo')
        nuevonodo.tiponodo = tiponodo;
    else
        nuevonodo.tiponodo = '';
    nuevonodo.valor = valor;
    nuevonodo.padre = '';
    nodoscreados.push(nuevonodo);
    $(function () {
        exportar('json').done(function (result) {
            //getjson().done(function (result) {
            //archivoguardar = JSON.stringify(result);
            //alert(nodoscreados+" | "+result+" | "+archivoguardar);
            $('#jsonview').jsonView(result, {"status": "close"});
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
            return null;
        });

    });
}

//Funcion para encontrar el nodo a copiar
function buscarnodo(idnodo) {
    var nodobus = new Array;
    for (i = 0; i < nodoscreados.length; i++) {
        if (nodoscreados[i].idnodo == idnodo) {
            //alert("Lo encontre " + idnodo);
            nodobus.push(idnodo);
            nodobus.push(nodoscreados[i].x);
            nodobus.push(nodoscreados[i].y);
            nodobus.push(nodoscreados[i].caracteristica);
            nodobus.push(nodoscreados[i].tiponodo);
            nodobus.push(nodoscreados[i].valor);
            return nodobus;
        }
    }
}

function eliminarnodo(idnodo) {
    //alert("aqui");
    var cont = 0;
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idnodo) {
            //alert("id" + nodo.idnodo + " tipo" + nodo.tiponodo + " valor" + nodo.valor + " padre" + nodo.padre + " " + nodo.caracteristica);
            console.log("se separaran " + nodo.padre + " con " + nodo.idnodo);
            separarpadrehijo(nodo.padre, nodo.idnodo);
            if (nodo.caracteristica == 'Nodo') {
                nodo.idhijos.forEach(function (hijo) {
                    //alert("hijo" + hijo);
                    separarpadrehijo(nodo.idnodo, hijo);
                    console.log("se separaron " + nodo.idnodo + " con " + hijo + " dejandolo con los hijos " + nodo.idhijos);
                });
            }
            //alert("se va elemento "+cont);
            nodoscreados.splice(cont, 1);
            console.log("finalizacion de separacion con " + nodoscreados);
        }
        cont += 1;
    });
    $(function () {
        exportar('json').done(function (result) {
            $('#jsonview').jsonView(result, {"status": "close"});
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
            return null;
        });
    });
}

function deshacer() {
    alert("deshacer");
}

function rehacer() {
    alert("rehacer");
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
        exportar('json').done(function (result) {
            //getjson().done(function (result) {
            //archivoguardar = JSON.stringify(result);
            //alert(nodoscreados+" | "+result+" | "+archivoguardar);
            $('#jsonview').jsonView(result, {"status": "close"});
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
            return null;
        });
    });
}

//Funcion usada para separar a un padre con su hijo
function separarpadrehijo(idpadre, idhijo) {
    nodoscreados.forEach(function (nodo) {
        if (nodo.idnodo == idpadre) {
            var it = 0;
            nodo.idhijos.forEach(function (idnodohijo) {
                if (idnodohijo == idhijo) {
                    nodo.idhijos.splice(it, 1);
                    console.log(nodo.idnodo + " mis hijos son " + nodo.idhijos);
                }
                it += 1;
            });
        }
        if (nodo.idnodo == idhijo) {
            //alert("hubo una conexion padre "+idpadre+" hijo "+idhijo);
            nodo.padre = '';
        }
    });
    $(function () {
        exportar('json').done(function (result) {
            //getjson().done(function (result) {
            //archivoguardar = JSON.stringify(result);
            //alert(nodoscreados+" | "+result+" | "+archivoguardar);
            $('#jsonview').jsonView(result, {"status": "close"});
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
            return null;
        });
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
//    $(function () {
//        exportar('json').done(function (result) {
//            //getjson().done(function (result) {
//            //archivoguardar = JSON.stringify(result);
//            //alert(nodoscreados+" | "+result+" | "+archivoguardar);
//            $('#jsonview').jsonView(result, {"status": "close"});
//        }).fail(function () {
//            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
//            return null;
//        });
//    });
}

function getnodo(idnodo) {
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
    console.log("id socket " + idsocket);
});

function getidsocket() {
    return idsocket;
}

//En esta funcion se preparara al modal informandole de los datos actuales del nodo
function mostrarmodal(idnodo) {
    var retorono = false;
    //alert('propiedades de '+idnodo);
    nodoscreados.forEach(function (nodo) {
        //alert(nodo.idnodo+' it '+idnodo);
        if (nodo.idnodo == idnodo) {
            $(function () {
                $('#idnodoeditando').val(idnodo);
                $('#tipo').val(nodo.tiponodo);
                $('#valor').prop("disabled", false);
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
        $(function () {
            exportar('json').done(function (result) {
                //getjson().done(function (result) {
                //archivoguardar = JSON.stringify(result);
                //alert(nodoscreados+" | "+result+" | "+archivoguardar);
                $('#jsonview').jsonView(result, {"status": "close"});
            }).fail(function () {
                alert("no se pudo exportar el archivo a formato json, favor reviselo.");
                return null;
            });

        });
    });
    $("#guardarproyecto").click(function () {
        setTimeout(function () {
            console.log('Se enviara proyecto a guardar: ' + nombreproyecto + " de " + usuarioconectado);
            //socket.emit('enviar proyecto', nodoscreados, paranodo, estilo, paraestilo, nombreproyecto, usuarioconectado);
        }, 1100);
    });

    $('#postguardar').submit(function (e) {
        //if (!sintaxisnodos())
        //    return false;
        //else{
        //setTimeout(function () {
        var stringproyecto = JSON.stringify(nodoscreados, paranodo);
        var stringestilo = JSON.stringify(estilo, paraestilo);
        //alert('q pasa '+nodoscreados+" "+paranodo+" "+JSON.stringify(nodoscreados,paranodo));
        $(this).append('<input type="hidden" name="nodoscreados" value=' + stringproyecto + ' />');
        $(this).append('<input type="hidden" name="estilo" value=' + stringestilo + ' />');
        $(this).append('<input type="hidden" name="nombreproyecto" value="' + nombreproyecto + '" />');
        $(this).append('<input type="hidden" name="usuarioconectado" value="' + usuarioconectado + '" />');
        return true;
        //}, 800);
        //}
    });

    $('#exportarsql').click(function () {
        archivoguardar = '';
        exportar('sql').done(function (result) {
            //console.log("lo que recibi "+result['proyecto']['sql']);
            archivoguardar = result['proyecto']['sql'];
            archivoguardar = String(archivoguardar);
            if (archivoguardar != '') {
                console.log("se exportara el proyecto " + " en " + archivoguardar);
                nombreArchivo = getnombreproyecto() + ".sql";
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(new Blob([archivoguardar], {type: "plain/text;charset=utf-8"}));
            }
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato sql, favor reviselo.");
            return null;
        });
    });

    $('#exportarneo4j').click(function () {
        archivoguardar = '';
        exportar('neo4j').done(function (result) {
            //console.log("lo que recibi "+result['proyecto']['sql']);
            archivoguardar = result['proyecto']['grafo'];
            archivoguardar = String(archivoguardar);
            if (archivoguardar != '') {
                console.log("se exportara el proyecto " + " en " + archivoguardar);
                nombreArchivo = "neo_" + getnombreproyecto() + ".txt";
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(new Blob([archivoguardar], {type: "plain/text;charset=utf-8"}));
            }
        }).fail(function () {
            alert("no se pudo exportar el archivo a Neo4J, favor reviselo.");
            return null;
        });
    });

    $('#exportarcassandra').click(function () {
        archivoguardar = '';
        exportar('cassandra').done(function (result) {
            console.log("lo que recibi " + result['proyecto']['cassandra']);
            archivoguardar = result['proyecto']['cassandra'];
            archivoguardar = String(archivoguardar);
            if (archivoguardar != '') {
                console.log("se exportara el proyecto " + " en " + archivoguardar);
                nombreArchivo = "cassa_" + getnombreproyecto() + ".txt";
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(new Blob([archivoguardar], {type: "plain/text;charset=utf-8"}));
            }
        }).fail(function () {
            alert("no se pudo exportar el archivo a Neo4J, favor reviselo.");
            return null;
        });
    });

    $('#exportarmongo').click(function () {
        archivoguardar = '';
        exportar('mongo').done(function (result) {
            //console.log("lo que recibi "+result['proyecto']['sql']);
            archivoguardar = result['proyecto']['json'];
            archivoguardar = String(archivoguardar);
            if (archivoguardar != '') {
                console.log("se exportara el proyecto " + " en " + archivoguardar);
                nombreArchivo = "mongo_" + getnombreproyecto() + ".txt";
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(new Blob([archivoguardar], {type: "plain/text;charset=utf-8"}));
            }
        }).fail(function () {
            alert("no se pudo exportar el archivo a mongoDB, favor reviselo.");
            return null;
        });
    });

    $('#exportarproyecto').click(function () {
        archivoguardar = '';
        exportar('json').done(function (result) {
            archivoguardar = JSON.stringify(result);
            if (archivoguardar != '') {
                console.log("se exportara el proyecto " + " en " + archivoguardar);
                nombreArchivo = getnombreproyecto() + ".json";
                var reader = new FileReader();
                reader.onload = function (event) {
                    var save = document.createElement('a');
                    save.href = event.target.result;
                    save.target = '_blank';
                    save.download = nombreArchivo || 'archivo.dat';
                    var clicEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    });
                    save.dispatchEvent(clicEvent);
                    (window.URL || window.webkitURL).revokeObjectURL(save.href);
                };
                reader.readAsDataURL(new Blob([archivoguardar], {type: "application/json"}));
            }
        }).fail(function () {
            alert("no se pudo exportar el archivo a formato json, favor reviselo.");
            return null;
        });

    });
    
    $('.deshacer').click(function () {
        getundoredo().undo();
    });
    
    $('.rehacer').click(function () {
        getundoredo().redo();
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

        $(function () {
            exportar('json').done(function (result) {
                //getjson().done(function (result) {
                //archivoguardar = JSON.stringify(result);
                //alert(nodoscreados+" | "+result+" | "+archivoguardar);
                $('#jsonview').jsonView(result, {"status": "close"});
            }).fail(function () {
                alert("no se pudo exportar el archivo a formato json, favor reviselo.");
                return null;
            });
        });
    });
}

//Esta funcion verifica si no hay inconvenientes en la estructura creada
function sintaxisnodos() {
    r = true;
    var nombresnodos = [];
    //alert(nodoscreados.length+" tamano");
    nodoscreados.forEach(function (nodo) {
        nombresnodos.push(nodo.tiponodo);
    });
    if (hasDuplicates(nombresnodos)) {
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

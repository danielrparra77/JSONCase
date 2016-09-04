/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
app = express();// instruct the app to use the `bodyParser()` middleware for all routes
var http = require('http');
var server = app.listen(8010, function() {
    console.log('Web server listening on localhost: 8010');
});
//var server = http.createServer().listen(4000);
var io = require('socket.io').listen(server);


//Subscribe to the Redis chat channel

//Configure socket.io to store cookie set by Django

io.sockets.on('connection', function (socket) {
    //Client is sending message through socket.io
    socket.on('enviar sqlquery', function (message) {
        console.log('Message: ' + message);
    });
    //Se debe eliminar este socket ya que no es muy requerido pra guardar proyectos, basta con usar ajax
    socket.on('enviar proyecto', function (proyecto,parametros,estilo,paraestilo,nombreproyecto,usuario) {
        console.log('he recibido una peticion de enviar proyecto: ' + proyecto+" "+parametros+" "+
                estilo+" "+paraestilo+" "+nombreproyecto+" "+usuario);
        io.socket.broadcast.emit('recibir proyecto', proyecto,parametros,estilo,paraestilo,nombreproyecto,usuario);
    });
    socket.on('abrir proyecto', function (proyecto,idinterfaz) {
        console.log('he recibido una peticion de abrir proyecto: ' + proyecto+' para '+idinterfaz);
        io.sockets.to(idinterfaz).emit('abrir nuevo proyecto', proyecto);
    });
    //el tipo de este oyente indica si se dirige a objeto simple compuesto,linea o letra
    socket.on('enviar estilo', function (color,colorlinea,grosorlinea,tamano,fuente,tipo,idinterfaz) {
        console.log('he recibido una peticion de cambiar estilo de '+tipo+': ' +
                color+' '+colorlinea+' '+grosorlinea+' '+tamano+' '+fuente+' para '+idinterfaz);
        io.sockets.to(idinterfaz).emit('recibir estilos', color,colorlinea,grosorlinea,tamano,fuente,tipo);
        //cerrarventana();
    });
});

console.log("mi servidor" );
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular = angular.module("devson", []);

angular.controller("controlabrir", function($scope){
    $scope.proyecto = "";
    $scope.actualizar = function(archivoabrir){
        $scope.proyecto = archivoabrir;
    };
});
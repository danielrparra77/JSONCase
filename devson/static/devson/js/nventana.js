function mostrarInputFileModificado() {
    $("#archivo_oculto").change(function(){
        $("#archivo").val($("#archivo_oculto").val());
    });
}

function abrirventana(a) {
    var w = 496;
    var h = 304;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    newwindow = window.open(a, 'Abrir Proyecto', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
    newwindow.creator = self;
}

function abrirventanag(a) {
    var w = 496;
    var h = 218;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    newwindow = window.open(a, 'Guardar Proyecto', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
    newwindow.creator = self;
}

function abrirventanap(a) {
    var w = 742;
    var h = 632;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    newwindow = window.open(a, 'Propiedades', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
    newwindow.creator = self;
}
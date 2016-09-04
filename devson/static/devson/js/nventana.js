var newwindow;
function mostrarInputFileModificado() {
    $("#archivo_oculto").change(function(){
        $("#archivo").val($("#archivo_oculto").val());
    });
}

function abrirventana(a,idsock) {
    var winName='Abrir Proyecto';
    var winURL=a;
    $(function () {
        $("#postabrirventana").attr("action", winURL);
        $("#postabrirventana").attr("target", winName);
        $("#idsock").val(idsock);
    });
    var w = 496;
    var h = 304;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var windowoption='toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left;              
    newwindow = window.open('', winName,windowoption);
    newwindow.creator = self;
    $("#postabrirventana").submit();                 
    //newwindow = window.open(a, 'Abrir Proyecto', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
    //newwindow.creator = self;
}

function abrirventanag(a) {
    var winName='Guardar Proyecto';
    var winURL=a;
    $(function () {
        $("#postguardar").attr("action", winURL);
        $("#postguardar").attr("target", winName);
    });
    var w = 496;
    var h = 258;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var windowoption='toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left;              
    newwindow = window.open('', winName,windowoption);
    newwindow.creator = self;
    $("#postguardar").submit();
}

function abrirventanap(a,idsock,ventana) {
    var winName='Propiedades';
    var winURL=a;
    $(function () {
        $("#postabrirventana").attr("action", winURL);
        $("#postabrirventana").attr("target", winName);
        $("#idsock").val(idsock);
        $("#caracteristicaventata").val(ventana);
    });
    var w = 742;
    var h = 632;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var windowoption='toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left;              
    newwindow = window.open('', winName,windowoption);
    newwindow.creator = self;
    $("#postabrirventana").submit();
}

function cerrarventana(){
    newwindow.window.close();
}
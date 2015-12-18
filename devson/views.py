from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from django.template import RequestContext, loader

from devson.models import Proyecto
from datetime import datetime

def index(request):
    return render(request, 'devson/index.html')

def registro(request):
    return render(request, 'devson/registro.html')

def desarrolladores(request):
    return render(request, 'devson/desarrolladores.html')

def cliente(request):
    """
        En esta vista ya se debe saber que cliente fue el que se conecto coonociendo su usuario
        Aqui se vera la plantilla de cliente donde este puede hacer lo que desee
    """
    #p = Proyecto(K_NombreProyecto="", K_UsuarioCreo="ya debo tener usuario aqui",V_FechaCreacion = datetime.now())
    usuario = 'usuario'
    context = {'usuario': usuario}
    return render(request, 'devson/cliente.html',context)

def nuevoproyecto(request,usuario):
    """
        En esta vista se ve como el lciente entrega la solicitud de crear un nuevoproyecto,
        Esta solicitud requiere como parametro el usuario que la solicito, este parametro esta
        configurado para que sea pasado como argumento desde el url, ademas que ya debe poseer el nombre del nuevo proyecto
        Este nombre es entregado por medio de request, desde el formulario que la plantilla de cliente.html posee.
    """
    context = {'usuario': usuario}
    return render(request, 'devson/proyecto.html',context)
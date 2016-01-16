from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse, HttpResponseServerError
from django.template import RequestContext, loader
from devson.models import Proyecto
from datetime import datetime

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect,csrf_exempt
from django.views.generic import TemplateView
from django.views.generic.base import View
from django.views.generic.edit import FormView
from devson import config
from devson.forms import RegistrationForm, LoginForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
import redis
import json
import jsonproyect, sqlproyect, neo4jproyect, mongoproyect
from . import models
from datetime import datetime

def index(request):
    return render(request, 'devson/index.html')

def registro(request):
    return render(request, 'devson/registro.html')

def desarrolladores(request):
    return render(request, 'devson/desarrolladores.html')

@login_required()
def abrir(request):
    idsock = request.POST.get('idsock','')
    print idsock
    print 'abriendo nuevo proyecto'
    proyectosdb = models.Proyecto.objects.filter(K_UsuarioCreo=request.user).order_by('-V_FechaCreacion')[:20]
    print proyectosdb
    print request.user
    context = {'idsock': idsock,'proyectosdb':proyectosdb}
    return render(request, 'devson/abrir.html',context)


@login_required()
@csrf_exempt
def exportar(request):
    print "se exportara el proyecto"
    print request.POST.get('proyecto','')
    proyecto = request.POST.get('proyecto','')
    tipoexportacion = request.POST.get('exportar','')
    proyecto = json.loads(proyecto)
    if tipoexportacion=='json':
        jproyecto = jsonproyect.crearjson(proyecto)
    elif tipoexportacion=='sql':
        jproyecto = sqlproyect.crearsql(proyecto)
    elif tipoexportacion=='neo4j':
        jproyecto = neo4jproyect.crearneo4j(proyecto)
    elif tipoexportacion=='mongo':
        jproyecto = mongoproyect.crearmongo(proyecto)
    else:
        jproyecto = {'vacio':None}
    print jproyecto
    print 'se termino de exportar'
#    jnodos = []
    return HttpResponse(
            json.dumps({"proyecto": jproyecto}),
            content_type="application/json"
        )

@login_required()
@csrf_exempt
def abrirendb(request):
    print "se abrira un proyecto guardado desde la base de datos"
    print request.POST.get('proyecto','')
    proyecto = models.Proyecto.objects.get(id=request.POST.get('proyecto',''))
    estilos = models.EstiloObjeto.objects.filter(K_Proyecto=proyecto.id)
    jproyecto ={}
    jproyecto['nombre'] = proyecto.K_NombreProyecto
    jproyecto['usuario'] = proyecto.K_UsuarioCreo
    jestilo = {}
    for estilo in estilos:
        jestilo[estilo.V_Estilo] = estilo.V_Valor
    objetos = models.Objeto.objects.filter(K_Proyecto=proyecto.id)
    jobjetcs = []
    for objeto in objetos:
        valor = models.ValorObjeto.objects.filter(K_Objeto=objeto.id)
        print "se encontraron tantos valores "+str(valor.count())
        jobjeto = {}
        jobjeto['idnodo'] = objeto.V_IdLocal
        jobjeto['x'] = objeto.V_CoordenadaX
        jobjeto['y'] = objeto.V_CoordenadaY
        jobjeto['idhijos'] = []
        jobjeto['caracteristica'] = objeto.N_ClaseObjeto
        jobjeto['tiponodo'] = objeto.K_TipoObjeto
        if not objeto.N_SiRaiz:
            print objeto.K_HijoDe.V_IdLocal
            jobjeto['padre'] = objeto.K_HijoDe.V_IdLocal
        else:
            jobjeto['padre'] = ''
        if not valor.count() == 1:
            jobjeto['valor'] = []
            for itvalor in valor:
                jobjeto['valor'].append(itvalor.K_ValorObjeto)
        else:
            valor = models.ValorObjeto.objects.get(K_Objeto=objeto.id)
            jobjeto['valor'] = valor.K_ValorObjeto
        jobjetcs.append(jobjeto)
    for padre in jobjetcs:
        for hijo in jobjetcs:
            if hijo['padre'] == padre['idnodo']:
                padre['idhijos'].append(hijo['idnodo'])
    jproyecto['proyecto'] = jobjetcs
    jproyecto['estilo'] = jestilo
                
    return HttpResponse(
            json.dumps({"proyecto": jproyecto}),
            content_type="application/json"
        )


@login_required()
def guardar(request):
    print request.POST
    nodoscreados = request.POST.get('nodoscreados','')
    print nodoscreados
    estilo = request.POST.get('estilo','')
    print estilo
    nombreproyecto = request.POST.get('nombreproyecto','')
    print nombreproyecto
    usuarioconectado = request.POST.get('usuarioconectado','')
    print usuarioconectado
    context = {'nodoscreados': nodoscreados,'estilo': estilo,
        'nombreproyecto': nombreproyecto,'usuarioconectado': usuarioconectado}
    print 'Se esta solicitando ir al interfaz de guardar nuevo proyecto'
    return render(request, 'devson/guardar.html',context)

@login_required()
@csrf_exempt
def guardarendb(request):
    """
        En esta vista se propone guardar el proyecto ya construido por el cliente
        en la base de datos para ser usado en un momento futuro.
    """
    #proyecto = request.POST['proyecto']
    proyecto = request.POST.get('proyecto','')
    print request.POST
    proyecto = json.loads(proyecto)
    print proyecto
    print proyecto["nombre"]
    mproyecto = models.Proyecto(K_NombreProyecto=proyecto["nombre"],K_UsuarioCreo=proyecto["usuario"],V_FechaCreacion=datetime.now())
    mproyecto.save()
    print proyecto["estilo"]
    estilo = json.loads(proyecto["estilo"])
    mestilo = []
    mestilo.append(models.EstiloObjeto(V_Estilo="fondonodo",V_Valor=estilo["fondonodo"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="colorlineanodo",V_Valor=estilo["colorlineanodo"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="grosornodo",V_Valor=estilo["grosornodo"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="fondohoja",V_Valor=estilo["fondohoja"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="colorlineahoja",V_Valor=estilo["colorlineahoja"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="grosorhoja",V_Valor=estilo["grosorhoja"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="fuenteletra",V_Valor=estilo["fuenteletra"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="colorfuente",V_Valor=estilo["colorfuente"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="tamanofuente",V_Valor=estilo["tamanofuente"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="grosorconexion",V_Valor=estilo["grosorconexion"],K_Proyecto=mproyecto))
    mestilo.append(models.EstiloObjeto(V_Estilo="colorconexion",V_Valor=estilo["colorconexion"],K_Proyecto=mproyecto))
    print estilo["fondonodo"]
    nodos = json.loads(proyecto["proyecto"])
    print nodos
    mnodo = []
    mvalor = []
    #Se crearan todos los nodos
    for nodo in nodos:
        print nodo
        nuevo = models.Objeto(V_IdLocal=nodo["idnodo"],V_CoordenadaX=nodo["x"],V_CoordenadaY=nodo["y"],N_ClaseObjeto=nodo["caracteristica"],
            N_SiRaiz=(nodo["padre"]==''),K_Proyecto=mproyecto,K_TipoObjeto=nodo["tiponodo"])     
        nuevo.save()
        print nodo["valor"]
        valor = nodo["valor"]
        if '[' in valor and ']' in valor and valor.index('[')==0 and valor.index(']')==len(valor)-1:
            valor = valor[1:len(valor)-1].split(',')
            print "encontre multiples valores "+str(valor)
            for v in valor:
                mvalorn = models.ValorObjeto(K_ValorObjeto=v,K_Objeto=nuevo)
        else:
            print "encontre valor unico "+valor
            mvalorn = models.ValorObjeto(K_ValorObjeto=valor,K_Objeto=nuevo)
        mvalorn.save()
        mvalor.append(mvalorn)
        mnodo.append(nuevo)
    #Se relacionaran los nodos con sus padres
    print("relacionando con padres")
    for nodo in mnodo:
        if not nodo.N_SiRaiz:
            for node in mnodo:
                padreencontrado = False
                for it in nodos:
                    #print("buscando "+ it['idnodo']+","+nodo.V_IdLocal+","+ node.V_IdLocal+","+it['padre'])
                    if it['idnodo']==nodo.V_IdLocal and node.V_IdLocal == it['padre']:
                        print("se encontro una relacion en "+it['idnodo']+" con "+it['padre'])
                        nodo.K_HijoDe=node
                        padreencontrado = True
                        break
                if padreencontrado:
                    break
    print("se termino de relacionar con padres")
    for estilo in mestilo:
        estilo.save()
    for nodo in mnodo:
        nodo.save()
    print("se termino de guardar la informacion")
    return HttpResponse("El proyecto ha sido guardado correctamente en la base de datos del servidor")

@login_required()
def propiedades(request):
    idsock = request.POST.get('idsock','')
    print idsock
    print 'viendo propiedades de los nodos'
    context = {'idsock': idsock}
    return render(request, 'devson/propiedades.html',context)

@login_required()
def cliente(request):
    """
        En esta vista ya se debe saber que cliente fue el que se conecto coonociendo su usuario
        Aqui se vera la plantilla de cliente donde este puede hacer lo que desee
    """
    #p = Proyecto(K_NombreProyecto="", K_UsuarioCreo="ya debo tener usuario aqui",V_FechaCreacion = datetime.now())
    usuario = request.user
    context = {'usuario': usuario}
    return render(request, 'devson/cliente.html',context)

@login_required()
def nuevoproyecto(request,usuario):
    """
        En esta vista se ve como el lciente entrega la solicitud de crear un nuevoproyecto,
        Esta solicitud requiere como parametro el usuario que la solicito, este parametro esta
        configurado para que sea pasado como argumento desde el url, ademas que ya debe poseer el nombre del nuevo proyecto
        Este nombre es entregado por medio de request, desde el formulario que la plantilla de cliente.html posee.
    """
    if request.method == 'POST': # If the form has been submitted...
        try:
            nombreproyecto = request.POST['NombreProyecto']
            print nombreproyecto
            if nombreproyecto=='':
                return render(request, 'devson/cliente.html', {
                    'usuario': usuario,
                    'error_message': "Usted no ha escrito un nombre de proyecto.",
                })
            context = {'usuario': usuario,
                        'nombreproyecto': nombreproyecto}
            return render(request, 'devson/proyecto.html',context)
        except:
            # Redisplay the question voting form.
            return render(request, 'devson/cliente.html', {
                'usuario': usuario,
                'error_message': "Usted no ha escrito un nombre valido.",
            })

def propiedadesnodo(request,usuario,nodo):
    """
        En esta vista los clientes podran editar las prpiedaddes de sus nodos
        De esta forma por medio de un iframe podran hacer las ediciones correspondientes
    """
    context = {'usuario': usuario,'nodo': nodo}
    return render(request, 'devson/propiedadesnodo.html',context)

"""
Este metodo incompleto hasta ahora proone conectar el lado servidor de dajngo con el lado servidor de node
"""
@csrf_exempt
def node_api(request):
    try:
        #Get User from sessionid
        session = Session.objects.get(session_key=request.POST.get('sessionid'))
        user_id = session.get_decoded().get('_auth_user_id')
        user = User.objects.get(id=user_id)
 
        #Create comment
        Comments.objects.create(user=user, text=request.POST.get('comment'))
        
        #Once comment has been created post it to the chat channel
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        r.publish('chat', user.username + ': ' + request.POST.get('comment'))
        
        return HttpResponse("Everything worked :)")
    except Exception, e:
        return HttpResponseServerError(str(e))
"""
Fin de metodo de la conexion entre django y node
"""

class LoginView(FormView):
    template_name = 'devson/login.html'
    form_class = LoginForm

    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super(LoginView, self).dispatch(*args, **kwargs)

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(LoginView, self).form_valid(form)

    def get_success_url(self):
        try:
            return config.LOGIN_REDIRECT_URL
        except:
            return "/accounts/profile/"


class LogoutView(View):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LogoutView, self).dispatch(*args, **kwargs)

    def get(self, request):
        logout(request)
        return HttpResponseRedirect(config.LOGOUT_REDIRECT_URL)


class RegisterView(FormView):
    template_name = 'devson/register.html'
    form_class = RegistrationForm

    @method_decorator(csrf_protect)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return HttpResponseRedirect(config.INDEX_REDIRECT_URL)
        else:
            return super(RegisterView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):

        user = User.objects.create_user(
            username=form.cleaned_data['username'],
            password=form.cleaned_data['password1'],
            email=form.cleaned_data['email'],
            first_name=form.cleaned_data['first_name'],
            last_name=form.cleaned_data['last_name']
        )

        return super(RegisterView, self).form_valid(form)

    def get_success_url(self):
        return reverse('devson:register-success')


class RegisterSuccessView(TemplateView):
    template_name = 'devson/success.html'

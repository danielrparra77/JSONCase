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
from django.views.decorators.csrf import csrf_protect
from django.views.generic import TemplateView
from django.views.generic.base import View
from django.views.generic.edit import FormView
from devson import config
from devson.forms import RegistrationForm, LoginForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
import redis


def index(request):
    return render(request, 'devson/index.html')

def registro(request):
    return render(request, 'devson/registro.html')

def desarrolladores(request):
    return render(request, 'devson/desarrolladores.html')

@login_required()
def abrir(request):
    return render(request, 'devson/abrir.html')

@login_required()
def guardar(request):
    return render(request, 'devson/guardar.html')

@login_required()
def propiedades(request):
    return render(request, 'devson/propiedades.html')

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
        except (KeyError, Choice.DoesNotExist):
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

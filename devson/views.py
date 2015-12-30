from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
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


def index(request):
    return render(request, 'devson/index.html')

def registro(request):
    return render(request, 'devson/registro.html')

def desarrolladores(request):
    return render(request, 'devson/desarrolladores.html')

def abrir(request):
    return render(request, 'devson/abrir.html')

def guardar(request):
    return render(request, 'devson/guardar.html')

def propiedades(request):
    return render(request, 'devson/propiedades.html')

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
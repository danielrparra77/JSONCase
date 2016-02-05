"""Devson URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import  url
from . import views

urlpatterns = [
    #url(r'^$', views.index, name='index'),
    url(r'^$', views.LoginView.as_view(), name='login'),
    url(r'^cliente/$', views.cliente, name='cliente'),
    url(r'^registro/$', views.registro, name='registro'),
    url(r'^autores/$', views.autores, name='autores'),
    url(r'^(?P<usuario>[^/]+)/nuevoproyecto/$', views.nuevoproyecto, name='nuevoproyecto'),
    url(r'^(?P<usuario>[^/]+)/nuevoproyecto/propiedadesnodo/(?P<nodo>[^/]+)/$', views.propiedadesnodo, name='propiedadesnodo'),
    url(r'^node_api$', views.node_api, name='node_api'),
    url(r'^abrir/$', views.abrir, name='abrir'),
    url(r'^abrirendb/$', views.abrirendb, name='abrirendb'),
    url(r'^guardarendb/$', views.guardarendb, name='guardarendb'),
    url(r'^guardar/$', views.guardar, name='guardar'),
    url(r'^exportar/$', views.exportar, name='exportar'),
    url(r'^propiedades/$', views.propiedades, name='propiedades'),
    
    
    # sessions
    #url(r'^login/$', views.LoginView.as_view(), name='login'),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
    # register
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
    url(r'^register/success/$', views.RegisterSuccessView.as_view(), name='register-success'),
]


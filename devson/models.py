from __future__ import unicode_literals

from django.db import models

"""
En esta clase se registraran todos los proyectos que un usuario ha realizado
"""

class Proyecto(models.Model):
    K_NombreProyecto = models.CharField(max_length=200)
    K_UsuarioCreo = models.CharField(max_length=200)
    V_FechaCreacion = models.DateTimeField('date published')
    class Meta:
        unique_together = (('K_NombreProyecto', 'K_UsuarioCreo'),)

"""
Aqui se registraran todos los tipos de objetos que un nodo puede poseer
"""

class TipoObjeto(models.Model):
    N_TipoObjeto = models.CharField(max_length=200)

"""
    En esta clase se registraran todos los nodos de un proyecto,
    Se tendran en cuenta si son o no hojas, el tipo de objeto, las coordenadas donde fueron creadas
    y sus relaciones
"""

class Objeto(models.Model):
    V_CoordenadaX = models.IntegerField()
    V_CoordenadaY = models.IntegerField()
    N_ClaseObjeto = models.CharField(max_length=4)
    N_SiRaiz = models.BooleanField()
    K_Proyecto = models.ForeignKey(Proyecto)
    K_TipoObjeto = models.ForeignKey(TipoObjeto)
    K_HijoDe = models.ForeignKey("self")
    def setpadre(self,padre):
        self.K_HijoDe = padre
    
"""
    Aqui se registraran todos los posibles valores que un nodo puede tener
"""
class ValorObjeto(models.Model):
    K_ValorObjeto = models.CharField(max_length=1000)
    K_Objeto = models.ForeignKey(Objeto)

"""
    En esta clase se indican como seran los estilos de los nodos, las letras y las conexiones
"""
class EstiloObjeto(models.Model):
    V_Estilo = models.CharField(max_length=100)
    V_Valor = models.IntegerField()
    K_Proyecto = models.ForeignKey(Proyecto,default=None)
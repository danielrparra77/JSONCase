from __future__ import unicode_literals

from django.db import models

class Proyecto(models.Model):
    K_NombreProyecto = models.CharField(max_length=200)
    K_UsuarioCreo = models.CharField(max_length=200)
    V_FechaCreacion = models.DateTimeField('date published')
    class Meta:
        unique_together = (('K_NombreProyecto', 'K_UsuarioCreo'),)

class TipoObjeto(models.Model):
    N_TipoObjeto = models.CharField(max_length=200)

class Objeto(models.Model):
    V_CoordenadaX = models.IntegerField()
    V_CoordenadaY = models.IntegerField()
    N_ClaseObjeto = models.CharField(max_length=4)
    N_SiRaiz = models.BooleanField()
    K_Proyecto = models.ForeignKey(Proyecto)
    K_TipoObjeto = models.ForeignKey(TipoObjeto)
    K_HijoDe = models.ForeignKey("self")

class ValorObjeto(models.Model):
    K_ValorObjeto = models.CharField(max_length=1000)
    K_Objeto = models.ForeignKey(Objeto)

class EstiloObjeto(models.Model):
    V_TipoLetra = models.CharField(max_length=100)
    V_Color = models.IntegerField()
    K_Objeto = models.ForeignKey(Objeto)
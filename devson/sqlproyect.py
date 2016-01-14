# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Daniel Romero"
__date__ = "$13/01/2016 08:30:51 PM$"
import json
import jsonproyect

def crearsql(proyecto):
    jproyecto = {}
    sql = ''
    for padre in proyecto:
        if padre['padre']=='':
            if padre['caracteristica'] == 'Hoja':
                tabla = 'CREATE TABLE '+padre['tiponodo']+' ('
                tabla += 'PK_'+padre['tiponodo']+' int primary key, '
                tabla += padre['tiponodo']+' '+padre['valor']+')'
                sql+=tabla
            else:
                tiposhijos = [nodo["tiponodo"] for nodo in proyecto]
                if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
                    return {'error':'columnas duplicadas'}
                else:
                    tablas = creartabla(padre['tiponodo'],padre['idhijos'],proyecto)
                    for tabla in tablas:
                        sql+=str(tabla)
    return {'sql':sql}

"""
    En este metodo se crearan todas las tablas que esten conetadas
    por llaves foraneas
"""
def creartabla(nombre,columnas,proyecto):
    tablas = []
    restricciones = []
    tabla = 'CREATE TABLE '+nombre+' ('
    tabla += 'PK_'+nombre+' int primary key '
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
            if hijo['caracteristica'] == 'Hoja':
                tabla += ','+hijo['tiponodo']+' '+hijo['valor']
            else:
                tabla += ',K_'+hijo['tiponodo']+' '+hijo['valor']
                restricciones.append('ALTER TABLE '+nombre+' ADD CONTRAINT FK_'+hijo['tiponodo']+ ' FOREING KEY('+'K_'+hijo['tiponodo']+') REFERENCES '+hijo['tiponodo']+'.PK_'+hijo['tiponodo'])
                tablas.append(creartabla(hijo['tiponodo'],hijo['idhijos'],proyecto))
    tabla+=')'
    for restriccion in restricciones:
        tabla+=str(restriccion)
    tablas.append(tabla)
    return tablas
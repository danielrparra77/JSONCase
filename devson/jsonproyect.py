# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Daniel Romero"
__date__ = "$9/01/2016 05:31:14 PM$"
import json

def crearjson(proyecto):
    jproyecto = {}
    tiposhijos = [nodo["tiponodo"] for nodo in proyecto
        if nodo["padre"] ==  '']
    if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
        jproyecto = []
        for padre in proyecto:
            if padre['padre']=='':
                jnodo = {}
                if padre['caracteristica'] == 'Hoja':
                    jnodo[padre['tiponodo']] = padre['valor']
                else:
                    tiposhijos = [nodo["tiponodo"] for nodo in proyecto
                        if nodo["padre"] ==  padre['idnodo']]
                    if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
                        jnodo[padre['tiponodo']] = crearnodoarray(padre['idhijos'],proyecto)
                    else:
                        jnodo[padre['tiponodo']] = crearnodo(padre['idhijos'],proyecto)
                jproyecto.append(jnodo)
        return jproyecto
    else:
        for padre in proyecto:
            if padre['padre']=='':
                if padre['caracteristica'] == 'Hoja':
                    jproyecto[padre['tiponodo']] = padre['valor']
                else:
                    tiposhijos = [nodo["tiponodo"] for nodo in proyecto
                        if nodo["padre"] ==  padre['idnodo']]
                    if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
                        jproyecto[padre['tiponodo']] = crearnodoarray(padre['idhijos'],proyecto)
                    else:
                        jproyecto[padre['tiponodo']] = crearnodo(padre['idhijos'],proyecto)
        return jproyecto
"""
Con este metodo se pretende craer un objeto json con la composicion de sus hijos
el parametro sirepite indica si aalguno de sus hijos tienen el mismo nombre
"""
def crearnodo(idnodoshijos,proyecto):
    jnodo = {}
    for hijo in proyecto:
        if hijo['idnodo'] in idnodoshijos:
            if hijo['caracteristica'] == 'Hoja':
                jnodo[hijo['tiponodo']] = hijo['valor']
            else:
                tiposhijos = [nodo["tiponodo"] for nodo in proyecto
                    if nodo["idnodo"] in hijo['idhijos']]
                print 'tipos hijos '+str(tiposhijos)+' '+hijo['tiponodo']
                if len(tiposhijos)==len(set(tiposhijos)):
                    jnodo[hijo['tiponodo']] = crearnodo(hijo['idhijos'],proyecto)
                else:
                    jnodo[hijo['tiponodo']] = crearnodoarray(hijo['idhijos'],proyecto)
    return jnodo
"""
Con este metodo se pretende crear un nodo a partir de un array para que los elementos
duplicado no molesten
"""
def crearnodoarray(idnodoshijos,proyecto):
    jnodo = []
    for hijo in proyecto:
        if hijo['idnodo'] in idnodoshijos:
            jhijo = {}
            if hijo['caracteristica'] == 'Hoja':
                jhijo[hijo['tiponodo']] = hijo['valor']
            else:
                tiposhijos = [nodo["tiponodo"] for nodo in proyecto
                    if nodo["idnodo"] in hijo['idhijos']]
                if len(tiposhijos)!=len(set(tiposhijos)):
                    jhijo[hijo['tiponodo']] = crearnodoarray(hijo['idhijos'],proyecto)
                else:
                    jhijo[hijo['tiponodo']] = crearnodo(hijo['idhijos'],proyecto)
            jnodo.append(jhijo)
    return jnodo
# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Daniel Romero"
__date__ = "$18/01/2016 02:52:52 PM$"

import json
import jsonproyect

def crearcassandra(proyecto,nombreproyecto):
    jproyecto = {}
    cassandratablas = 'CREATE KEYSPACE Keyspace '+nombreproyecto+"\r\n"
    cassandratablas += "WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};"+"\r\n"
    for padre in proyecto:
        if padre['padre']=='':
            if padre['caracteristica'] == 'Hoja':
                tabla = 'CREATE TABLE '+padre['tiponodo']+' ('
                tabla += 'id uuid PRIMARY KEY, '
                tabla += padre['tiponodo']+' '+padre['valor']+')'+"\r\n"
                cassandratablas+=tabla
            else:
                tiposhijos = [nodo["tiponodo"] for nodo in proyecto]
                if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
                    return {'error':'columnas duplicadas'}
                else:
                    tablas = creartabla(padre['tiponodo'],padre['idhijos'],proyecto)
                    print("mis tablas "+str(tablas))
                    #for tabla in tablas:
                        #while type(tabla) is not str:
                            #tabla = tabla[0]
                    cassandratablas+=str(tablas)
    return {'cassandra':cassandratablas}

"""
    En este metodo se crearan todas las tablas que esten conetadas
    por llaves foraneas
"""
def creartabla(nombre,columnas,proyecto):
    tablas = ''
    foraneas = []
    tabla = 'CREATE TABLE '+nombre+' ('+"\r\n"
    tabla += 'id'+nombre+' uuid PRIMARY KEY'+"\r\n"
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
            if hijo['caracteristica'] == 'Hoja':
                tabla += ','+hijo['tiponodo']+' '+hijo['valor']+"\r\n"
            else:
                #tabla += ',K_'+hijo['tiponodo']+' uuid'+"\r\n"
                foranea = ''
                foranea += 'CREATE TABLE '+hijo['tiponodo']+'_'+nombre+' ('+"\r\n"
                foranea += 'id'+nombre+' uuid'+"\r\n"
                foranea += ',id'+hijo['tiponodo']+' uuid'+"\r\n"
                foranea += ',PRIMARY KEY (id'+nombre+',id'+hijo['tiponodo']+")\r\n"
                foranea += ')'+"\r\n"
                foraneas.append(foranea)
                tablas+=creartabla(hijo['tiponodo'],hijo['idhijos'],proyecto)
    tabla+=')'+"\r\n"
    tablas+=tabla
    for fora in foraneas:
        tablas+=str(fora)
    return tablas
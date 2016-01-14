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
                    print("mis tablas "+str(tablas))
                    #for tabla in tablas:
                        #while type(tabla) is not str:
                            #tabla = tabla[0]
                    sql+=str(tablas)
    return {'sql':sql}

"""
    En este metodo se crearan todas las tablas que esten conetadas
    por llaves foraneas
"""
def creartabla(nombre,columnas,proyecto):
    tablas = ''
    restricciones = []
    tabla = 'CREATE TABLE '+nombre+' ('+"\r\n"
    tabla += 'PK_'+nombre+' int'+"\r\n"
    restricciones.append('ALTER TABLE '+nombre+' ADD CONTRAINT CPK_'+nombre+ ' PRIMARY KEY(PK_'+nombre+");\r\n")
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
            if hijo['caracteristica'] == 'Hoja':
                tabla += ','+hijo['tiponodo']+' '+hijo['valor']+"\r\n"
            else:
                tabla += ',K_'+hijo['tiponodo']+' int'+"\n"
                restricciones.append('ALTER TABLE '+nombre+' ADD CONTRAINT FK_'+hijo['tiponodo']+ ' FOREING KEY('+'K_'+hijo['tiponodo']+') REFERENCES '+hijo['tiponodo']+'.PK_'+hijo['tiponodo']+";\r\n")
                tablas+=creartabla(hijo['tiponodo'],hijo['idhijos'],proyecto)
    tabla+=');'+"\r\n"
    for restriccion in restricciones:
        tabla+=str(restriccion)
    tablas+=tabla
    return tablas
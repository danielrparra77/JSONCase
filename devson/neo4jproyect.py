# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Daniel Romero"
__date__ = "$16/01/2016 05:31:14 PM$"
import json

def crearneo4j(proyecto):
    grafo = ''
    for padre in proyecto:
        if padre['padre']=='':
            if padre['caracteristica'] == 'Hoja':
                tabla = 'CREATE ('+padre['tiponodo']+':'
                tabla += padre['valor']+')'
                grafo+=tabla
            else:
                tiposhijos = [nodo["tiponodo"] for nodo in proyecto]
                if len(tiposhijos)!=len(set(tiposhijos)):#si duplicado
                    return {'error':'columnas duplicadas'}
                else:
                    tablas = crearnodo(padre['tiponodo'],padre['valor'],padre['idhijos'],proyecto)
                    print("mi neo4j hijos "+str(tablas))
                    #for tabla in tablas:
                        #while type(tabla) is not str:
                            #tabla = tabla[0]
                    grafo+=str(tablas)
    return {'grafo':grafo}

"""
    En este metodo se crearan todas las tablas que esten conetadas
    por llaves foraneas
"""
def crearnodo(nombre,valor,columnas,proyecto):
    caracteristica = verificarcaracteristica(columnas,proyecto)
    if caracteristica == 1:
        return crearnodohojas(nombre,valor,columnas,proyecto)
    elif caracteristica == 2:
        return crearnododenodos(nombre,valor,columnas,proyecto)
    elif caracteristica == 3:
        return crearnodohojasnodos(nombre,valor,columnas,proyecto)
    else:
        return None
"""
creara nodos al estilo
CREATE (AndyW:Person {name:'Andy Wachowski', born:1967})
"""
def crearnodohojas(nombre,valor,columnas,proyecto):
    subgrafos = ''
    hojas = []
    nodo = 'CREATE ('+nombre+':'+valor+"{"
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
            nodo += "\r\n"+hijo['tiponodo']+':'+hijo['valor']+","
            hojas.append('CREATE ('+hijo['tiponodo']+':'+hijo['valor']+')\r\n')
    nodo = nodo [:-1]#para eliminar la ultima coma
    nodo+='})'+"\r\n"
    for hoja in hojas:
        subgrafos+=str(hoja)
    subgrafos+=nodo
    return subgrafos

"""
creara nodos al estilo
CREATE CREATE(Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix)
"""
def crearnodohojasnodos(nombre,valor,columnas,proyecto):
    subgrafos = ''
    apuntadores = []
    nodosdentro = []#los nodos que est nodo tiene seran creados
    subgrafos = 'CREATE ('+nombre+':'+valor+')\r\n'
    nodo = 'CREATE ('+nombre+')-[:'+valor+" {\r\n"
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
                if hijo['caracteristica'] == 'Hoja':
                    nodo += "\r\n"+hijo['tiponodo']+':['+hijo['valor']+"],"
                else:
                    apuntadores.append('->('+hijo['tiponodo']+")\r\n") # a que nodos este nodo apunta
                    nodosdentro.append(crearnodo(hijo['tiponodo'],hijo['valor'],hijo['idhijos'],proyecto))
    nodo = nodo [:-1]#para eliminar la ultima coma de las hojas
    nodo+='}]'+"\r\n"
    for nodointerno in nodosdentro:
        subgrafos+=str(nodointerno)
    for apuntador in apuntadores:
        subgrafos+=str(nodo)+str(apuntador)
    return subgrafos

"""
creara nodos al estilo
CREATE (JoelS)-[:PRODUCED]->(TheMatrix)
"""
def crearnododenodos(nombre,valor,columnas,proyecto):
    subgrafos = ''
    apuntadores = []
    nodosdentro = []#los nodos que est nodo tiene seran creados
    subgrafos = 'CREATE ('+nombre+':'+valor+')\r\n'
    nodo = 'CREATE ('+nombre+')-[:'+valor+"]->"
    for hijo in proyecto:
        if hijo['idnodo'] in columnas:
            apuntadores.append('('+hijo['tiponodo']+")\r\n") # a que nodos este nodo apunta
            nodosdentro.append(crearnodo(hijo['tiponodo'],hijo['valor'],hijo['idhijos'],proyecto))
    for nodointerno in nodosdentro:
        subgrafos+=str(nodointerno)
    for apuntador in apuntadores:
        subgrafos+=str(nodo)+str(apuntador)
    return subgrafos


"""
    En este metodos se mirara si el nodo posee solo hojas, hhojas y nodos o solo nodos
    Esto es para que se puedan crear de esta forma:
        solo hojas: CREATE (AndyW:Person {name:'Andy Wachowski', born:1967})
        hojas y nodos: CREATE(Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix)
        solo nodos: (JoelS)-[:PRODUCED]->(TheMatrix)
    1 retornara solo hojas o sin hijos
    2 retornara solo nodos
    3 retornara nodos y hojas
"""

def verificarcaracteristica(hijosnodo,proyecto):
    verificacion = 0;
    for hijo in proyecto:
        if hijo['idnodo'] in hijosnodo:
            if hijo['caracteristica'] == 'Hoja':
                if verificacion == 2:
                    return 3
                else:
                    verificacion = 1
            else:
                if verificacion == 1:
                    return 3
                else:
                    verificacion = 2
    return verificacion
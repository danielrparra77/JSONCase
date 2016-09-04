# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Daniel Romero"
__date__ = "$16/01/2016 08:30:51 PM$"
import json
import jsonproyect

def crearmongo(proyecto):
    jproyecto = jsonproyect.crearjson(proyecto)
    stringjproyecto = json.dumps(jproyecto, separators=(',',':'))
    cabecera = 'db.genbetadev.insert(\r\n'
    cola = '\r\n)'
    return {'json':(cabecera+stringjproyecto+cola)}
exports.consultarTipoEstudio = async( id ) => {
   console.log(id);
   const datos=[{
      titulo: "Biometría Hemática",
      descripcion: "Examen de sangre que inspecciona...",
      codigo: "BH",
      parametros: [
         {
            nombreValor: "num",
            nombreparametro: "Sangre",
            codigo: "SG",
            minimo: 0,
            maximo: 10,
            unidad: "ml"
         },
         {
            nombreValor: "num",
            nombreParametro: "Glucosa",
            codigo: "GL",
            minimo: 0,
            maximo: 200,
            unidad: "mg/dL"
         },
         {
            nombreValor: "bool",
            nombreParametro: "Nitritos",
            codigo: "NT",
            valorBool: true
         },
         {
            nombreValor: "string",
            nombreParametro: "Color",
            codigo: "CL",
            valorString: "Rojo"
         }
      ]
   }]

   const datos2={
      "success": "success",
      "data": {
         "data": [
            {
                  "idParametro": {
                     "nombre": "Nitritos",
                     "codigo": "NA",
                     "tieneRango": false,
                     "unidad": "NA",
                     "valorBool": false,
                     "idTipoValor": {
                        "nombre": "Positivo/Negativo",
                        "createdAt": "2022-05-18T16:56:13.069Z",
                        "updatedAt": "2022-05-18T23:48:57.239Z",
                        "objectId": "wqr3RO2S64",
                        "__type": "Object",
                        "className": "TipoValor"
                     },
                     "createdAt": "2022-05-18T17:07:20.244Z",
                     "updatedAt": "2022-05-18T17:07:20.244Z",
                     "objectId": "6BPbQJ8aym",
                     "__type": "Object",
                     "className": "Parametro"
                  },
                  "createdAt": "2022-05-18T17:11:36.634Z",
                  "updatedAt": "2022-05-19T04:45:18.426Z",
                  "objectId": "BiRmOjRgAj"
            },
            {
                  "idParametro": {
                     "nombre": "Color",
                     "codigo": "NA",
                     "unidad": "NA",
                     "valorString": "AMARILLO",
                     "idTipoValor": {
                        "nombre": "Texto",
                        "createdAt": "2022-05-18T16:56:22.795Z",
                        "updatedAt": "2022-05-18T16:56:22.795Z",
                        "objectId": "Az39LfT9iZ",
                        "__type": "Object",
                        "className": "TipoValor"
                     },
                     "tieneRango": false,
                     "createdAt": "2022-05-18T17:10:45.740Z",
                     "updatedAt": "2022-05-18T17:10:45.740Z",
                     "objectId": "EuYV4fne9X",
                     "__type": "Object",
                     "className": "Parametro"
                  },
                  "createdAt": "2022-05-18T17:11:51.884Z",
                  "updatedAt": "2022-05-18T17:11:51.884Z",
                  "objectId": "fE9Rb1RSEH"
            },
            {
               "idParametro": {
                  "nombre": "NEUTROFILOS SEGMENTADOS",
                  "codigo": "SG",
                  "unidad": "u/L",
                  "valorA": 1400,
                  "valorB": 6500,
                  "idTipoValor": {
                     "nombre": "Numérico",
                     "createdAt": "2022-05-18T16:56:22.795Z",
                     "updatedAt": "2022-05-18T16:56:22.795Z",
                     "objectId": "Az39LfT9iZ",
                     "__type": "Object",
                     "className": "TipoValor"
                  },
                  "tieneRango": true,
                  "createdAt": "2022-05-18T17:10:45.740Z",
                  "updatedAt": "2022-05-18T17:10:45.740Z",
                  "objectId": "EuYV4fneoP",
                  "__type": "Object",
                  "className": "Parametro"
               },
               "createdAt": "2022-05-18T17:11:51.884Z",
               "updatedAt": "2022-05-18T17:11:51.884Z",
               "objectId": "fE9Rb1RSEH"
         },
            {
                  "nombre": "Examen General de Orina",
                  "descripcion": "Examen para identificar alteraciones a nivel del sistema renal y urinario",
                  "activo": true,
                  "codigo": "EGO",
                  "createdAt": "2022-05-18T16:52:52.104Z",
                  "updatedAt": "2022-05-19T03:25:24.165Z",
                  "parametros": {
                     "__type": "Relation",
                     "className": "Parametro"
                  },
                  "objectId": "oa4rkaUoYk"
            }
         ],
         "error": null
      },
      "message": "ParÃ¡metros obtenidos exitosamente."
   }

   return datos2
}

// const datos=["Estudio de ejemplo", 
// "Descripción del estudio de ejemplo", 
// 2, 
// "Hipermoglobina", 
// 15, 
// 100, 
// "mg/PL", ]
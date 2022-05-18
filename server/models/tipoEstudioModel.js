exports.consultarTipoEstudio = async( id ) => {
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

   return datos
}

// const datos=["Estudio de ejemplo", 
// "Descripción del estudio de ejemplo", 
// 2, 
// "Hipermoglobina", 
// 15, 
// 100, 
// "mg/PL", ]
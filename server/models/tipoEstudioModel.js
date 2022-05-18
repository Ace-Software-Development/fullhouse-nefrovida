exports.consultarTipoEstudio = async( id ) => {
   const datos=[{
      titulo: "Biometría Hemática",
      descripcion: "Examen de sangre que inspecciona...",
      parametros: [
         {
            nombre: "numero",
            parametro: "Sangre",
            minimo: 0,
            maximo: 10,
            unidad: "ml"
         },
         {
            nombre: "numero",
            parametro: "Glucosa",
            minimo: 0,
            maximo: 200,
            unidad: "mg/dL"
         },
         {
            nombre: "bool",
            parametro: "Parametro 3",
            minimo: 0,
            maximo: 50,
            unidad: "L"
         },
         {
            nombre: "string",
            parametro: "Parametro 4",
            minimo: 10,
            maximo: 20,
            unidad: "shots"
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
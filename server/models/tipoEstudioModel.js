exports.consultarTipoEstudio = async( id ) => {
   const datos=[{
      titulo: "Biometría Hemática",
      descripcion: "Examen de sangre que inspecciona...",
      parametros: [
         {
            parametro: "Sangre",
            minimo: 0,
            maximo: 10,
            unidad: "ml"
         },
         {
            parametro: "Glucosa",
            minimo: 0,
            maximo: 200,
            unidad: "mg/dL"
         },
         {
            parametro: "Parametro 3",
            minimo: 0,
            maximo: 50,
            unidad: "L"
         },
         {
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
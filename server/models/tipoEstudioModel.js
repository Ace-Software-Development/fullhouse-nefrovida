const CONSTANTS = require("../constantsProject");
const parametroEstudio = require("./parametroEstudioModel");

const TipoEstudio = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);


   /**
    * Función auxiliar para retornar los datos y el error.
    * @param {Object} data - Datos a retornar
    * @param {string} error - Mensaje de error en caso de existir
    * @returns
    */
   function results(data, error) {
      return {
         data: data,
         error: error
      }
   }


   /**
    * asyncConsultarParametrosDeEstudio Función asíncrona para obtener todos los parámetros
    * de un estudio; recibe el ID del estudio que desea buscar.
    * @param {string} idTipoEstudio ObjectId del tipo de estudio
    * @returns Lista con todos los parámetros del tipo de estudio y la información del tipo de estudio.
    */


   exports.consultarParametrosDeEstudio = async(idTipoEstudio) => {
      const table = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
      let query = new Parse.Query(table);


      try {

         // Obtener el tipo de estudio
         const tipoEstudio = await query.get(idTipoEstudio);

         // Obtener de la tabla ParametroEstudio todos los registros cuyo
         // pointer a idTipoEstudio sea el estudio.
         const tableParametroEstudio = Parse.Object.extend(CONSTANTS.PARAMETROESTUDIO);
         let queryParametros = new Parse.Query(tableParametroEstudio);
         queryParametros.include(CONSTANTS.IDPARAMETRO);
         queryParametros.include([CONSTANTS.IDPARAMETRO + '.' + CONSTANTS.IDTIPOVALOR]);
         queryParametros.equalTo(CONSTANTS.IDTIPOESTUDIO, tipoEstudio);
         queryParametros.select(CONSTANTS.IDPARAMETRO);

         try {
               let parametros = await queryParametros.find();

               // Mostrar error si no hay parámetros
               if (!parametros || parametros === []) {
                  return results(null, 'No hay parámetros registrados para este tipo de estudio.');
               }

               // Enviar el error si el tipo de estudio no esta activo
               if ( !tipoEstudio.get(CONSTANTS.ACTIVO)) {
                     return results(null, 'El tipo de estudio fue eliminado anteriormente.');
               }

               // Añadir la información del tipo de estudio a los resultados
               parametros.push(tipoEstudio);

               return results(parametros, null);
         } catch(error) {
               // Devolver error al obtener los parámetros
               return results(null, error.message);
         }
      } catch(error) {

         // Devolver error al obtener los parámetros
         return results(null, 'No se encontró dicho estudio.');
      }
   }


/**
 * consultarTiposDeEstudio Función asíncrona para obtener todos los tipos de estudio.
 * @returns Lista con todos los tipo de estudio.
 */
exports.consultarTiposDeEstudio = async() => {
   const table = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
   const query = new Parse.Query(table);
   query.equalTo(CONSTANTS.ACTIVO, true);

   try {

      //Obtener tipos de estudio
      const tiposDeEstudio = await query.find();

      // Mostrar error si no hay tipos de etudio registrados
      if (!tiposDeEstudio || tiposDeEstudio === []) {
         return {
            data: null,
            error: 'No hay tipos de estudio registrados.'
         }
      }

      //Devolver los tipos de estudio
      return {
         data: tiposDeEstudio,
         error: null
      }
   } catch (error) {

      //Devolver error al intentar obtener tipos de estudio
      return {
         data: null,
         error: error.message
      }
   }

}


/**
 * asyncRegistrarTipoEstudio Función asíncrona para registrar un nuevo tipo de estudio,
 * recibe los datos del tipo de estudio a guardar.
 * @param {object} data - Objeto que contenga la información del nuevo tipo de estudio
 * @returns Información del nuevo tipo de estudio o un error en caso de existir.
 */
exports.registrarTipoEstudio = async(data) => {
   try {
      const tipoEstudio = new TipoEstudio();
      tipoEstudio.set(CONSTANTS.NOMBRE, data.nombre);
      tipoEstudio.set(CONSTANTS.DESCRIPCION, data.descripcion);
      tipoEstudio.set(CONSTANTS.ACTIVO, true);

      if (data.codigo) {
         tipoEstudio.set(CONSTANTS.CODIGO, data.codigo);
      }

      const resultsTipoEstudio = await tipoEstudio.save();
      

      let resultParametros 
      data.parametros.map(async(parametro) => {
         resultParametros = await parametroEstudio.registrarParametroEstudio( parametro.value, resultsTipoEstudio.id);
      });

      return results(resultParametros, null);
         

   } catch (error) {

      return results(null, error.message);
   }
}
/*
 * asyncBorrarTipoEstudio Función asíncrona para eliminar un tipo de estudio
 * @param {Object} data Información enviada en el body, debe incluir información del estudio
 * y el resultado de cada parámetro
 * @returns Información de los resultados o un error en caso de existir.
 */
exports.borrarTipoEstudio = async(data) => {
   const query = new Parse.Query(CONSTANTS.TIPOESTUDIO);
   query.equalTo(CONSTANTS.OBJECTID, data.idTipoEstudio);
   const result = await query.first();
   result.set(CONSTANTS.ACTIVO, false);
   try{
      await result.save();
      return {
         tipoEstudio: result,
         error: null
      }
   } catch (error) {
      return {
         tipoEstudio: null,
         error: 'No se pudo eliminar el tipo de estudio.'
      }
   }
}
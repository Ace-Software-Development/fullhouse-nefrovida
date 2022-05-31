const estudioModel = require('../models/estudioModel')

/**
 * asyncRegistrarResultadosEstudio Funciòn asíncrona para registrar los resultados de un
 * nuevo estudio para un paciente.
*/
module.exports.registrarResultadosEstudio = async(request, response) => {
    console.log('data', request);
    try {
        const results = await estudioModel.registrarResultadosEstudio(request.body);
        console.log(results)
        // Envía error en caso de ser necesario
        if (results.error) {
            return response.status(400).send({
                status: 'error',
                data: null,
                message: 'Error. ' + results.error
            })
        }
        // Respuesta exitosa
        response.status(200).send({
            success: 'success',
            data: results,
            message: 'Estudio registrado exitosamente.'
        })

    } catch(error) {
        response.status(400).send({
            status: 'error',
            data: null,
            message: 'Error. ' + error.message
        })
    }
} 

/**
 * asyncConsultarEstudioPaciente Función asíncrona para obtener la información de un
 * estudio registrado de un paciente en Nefrovida.
 * @param {object} request Información enviados al servidor
 * @param {object} response - Respuesta de la petición al servidor
 * @returns Respuesta de la petición
 */
module.exports.consultarEstudioPaciente = async(request, response) => {
    const id = request.query.id;
    try {
        const results = await estudioModel.obtenerEstudioPaciente(id);
        if (results.error) {
            return response.status(404).send( {
                estudio: null,
                message: results.error
            });
        }
        response.status(200).send( {
            estudio: results.estudio,
            message: 'Estudio de paciente obtenido!!!'
        });
        
    } catch(error) {
        response.status(404).send( {
            estudio: null,
            message: error.message
        });
    }
}

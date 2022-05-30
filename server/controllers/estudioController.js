const estudioModel = require('../models/estudioModel');


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
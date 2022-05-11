const pacienteModel = require('../models/pacienteModel')

module.exports.crearPaciente = async(request, response) => {
    try {
        const results = await pacienteModel.registrarPaciente(request.body);

        try {
            if (results.error) {
                return response.status(400).send( {
                    status: 'error',
                    data: null,
                    message: "Error. " + results.error
                })
            }
            response.status(200).send( {
                success: 'true',
                data: results,
                message: "Paciente creado exitosamente"
            })
        } catch (error) {
        }

    } catch(error) {
        return response.status(400).send( {
            status: 'error',
            data: null,
            message: "Error. " + error.message
        })
    }
}

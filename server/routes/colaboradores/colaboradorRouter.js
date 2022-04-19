const parseServer = require('parse-server').ParseServer;
let CONSTANTS = require("../../constantsProject");
const express = require('express');
const router = express.Router();

const Colaborador = Parse.Object.extend(CONSTANTS.COLABORADOR);

router.post('/', (request, response) => {
    const colaborador = new Colaborador();
    colaborador.attributes = request.body;

    // colaborador.set(CONSTANTS.IDCOLABORADOR, "usuario");
    // colaborador.set(CONSTANTS.NOMBRE, "Primero Segundo");
    // colaborador.set(CONSTANTS.APELLIDOPATERNO, "Apellido");
    // colaborador.set(CONSTANTS.APELLIDOMATERNO, "Apellido2");
    // colaborador.set(CONSTANTS.FECHANACIMIENTO, "01/01/2000");
    // colaborador.set(CONSTANTS.SEXO, "Masculino");
    // colaborador.set(CONSTANTS.CORREO, "usuario@gmail.com");
    // colaborador.set(CONSTANTS.TELEFONO, 4429999999);
    // colaborador.set(CONSTANTS.CONTRASENA, "do8hjn48hjnkl49-4")
    // colaborador.set(CONSTANTS.ACTIVO, true);
    // colaborador.set(CONSTANTS.IDROL, 1);

    colaborador.save()
    .then((colaborador) => {
        console.log('Colaborador creado con objectId: ' + colaborador.id);
    }, (error) => {
        console.log('Error al intentar crear colaborador: ' + error.message);
    });
});

module.exports = router;
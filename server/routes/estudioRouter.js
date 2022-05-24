let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const {authUsuario, authRol} = require('../rbac/Authentication')

const estudioController = require("../controllers/estudioController");

router.get('/:idEstudio', estudioController.consultarEstudioPaciente);

module.exports = router;
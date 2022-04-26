let CONSTANTS = require("../../constantsProject");
const express = require('express');
const router = express.Router();

const colaboradorController = require("../../controllers/colaboradores/colaboradorController");

router.post('/', colaboradorController.registrarColaborador);

module.exports = router;
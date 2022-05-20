/**
 * Script para poblar base de datos del sistema sin los roles.
 * ejecutar: node dbPrueba.js
*/

var Parse = require('parse/node');
Parse._initialize("app_id", "", "master_key");
Parse.serverURL = 'http://localhost:6535/parse';

let CONSTANTS = require("../constantsProject");

// AREA
const Area = Parse.Object.extend(CONSTANTS.AREA);
const area = new Area();
area.set(CONSTANTS.NOMBREAREA, "Nutrición");
area.save();

// _User
const colaborador = new Parse.User();
colaborador.set(CONSTANTS.USUARIO, "AndreaP3");
colaborador.set(CONSTANTS.NOMBRE, "Andrea");
colaborador.set(CONSTANTS.APELLIDOPATERNO, "Piñeiro");
colaborador.set(CONSTANTS.APELLIDOMATERNO, "Cavazos");
colaborador.set(CONSTANTS.CORREO, "andreapc@correo.com");
colaborador.set(CONSTANTS.TELEFONO, 4426598556);
colaborador.set(CONSTANTS.CONTRASENA, "ASD1233456")
colaborador.set(CONSTANTS.ACTIVO, true);
colaborador.set(CONSTANTS.IDROL, "10WxPw5t2h");
colaborador.save();

/*
// PACIENTE
const Paciente = Parse.Object.extend(CONSTANTS.PACIENTE);
const paciente = new Paciente();
paciente.set(CONSTANTS.CURP, "PICA0304MEVN3");
paciente.set(CONSTANTS.NOMBREPACIENTE, "David");
paciente.set(CONSTANTS.APELLIDOPATERNOPACIENTE, "Guzmán");
paciente.set(CONSTANTS.APELLIDOMATERNOPACIENTE, "Leyva");
paciente.set(CONSTANTS.FECHANACIMIENTOPACIENTE, "26/04/2001");
paciente.set(CONSTANTS.EDADPACIENTE, 21);
paciente.set(CONSTANTS.TELEFONOPACIENTE, 4271103432);
paciente.set(CONSTANTS.CORREOPACIENTE, "davidguzley@gmail.com");
paciente.set(CONSTANTS.SEXOPACIENTE, "Masculino");
paciente.set(CONSTANTS.ESTATURAPACIENTE, 188);
paciente.set(CONSTANTS.PESOPACIENTE, 85);
paciente.set(CONSTANTS.ACTIVOPACIENTE, true);
paciente.save();


// TIPOESTUDIO
const TipoEstudio = Parse.Object.extend(CONSTANTS.TIPOESTUDIO);
const tipoEstudio = new TipoEstudio();
tipoEstudio.set(CONSTANTS.NOMBRETIPOESTUDIO, "Biometría Hemática");
tipoEstudio.set(CONSTANTS.DESCRIPCIONTIPOESTUDIO, "Examen de sangre que inspecciona las células que la componen");
tipoEstudio.set(CONSTANTS.ACTIVOTIPOESTUDIO, true);
tipoEstudio.set(CONSTANTS.CODIGOTIPOESTUDIO, "BH");
tipoEstudio.save();

// TIPOVALOR
const TipoValor = Parse.Object.extend(CONSTANTS.TIPOVALOR);
const tipoValor = new TipoValor();
tipoValor.set(CONSTANTS.NOMBRETIPOVALOR, "Numérico");
tipoValor.save();

// PARAMETRO
const Parametro = Parse.Object.extend(CONSTANTS.PACIENTE);
const parametro = new Parametro();
parametro.set(CONSTANTS.NOMBREPARAMETRO, "Glucosa");
parametro.set(CONSTANTS.CODIGOPARAMETRO, "glu");
parametro.set(CONSTANTS.UNIDADPARAMETRO, "mg/dL");
parametro.set(CONSTANTS.TIPOVALORPARAMETRO, "mg/dL");
parametro.set(CONSTANTS.TIENERANGOPARAMETRO, true);
parametro.set(CONSTANTS.VALORMINPARAMETRO, 7);
parametro.set(CONSTANTS.VALORMAXPARAMETRO, 250);
parametro.set(CONSTANTS.VALORBOOLPARAMETRO, true);
parametro.set(CONSTANTS.VALORSTRINGPARAMETRO, "AMARILLO CLARO");
parametro.save();


// PARAMETROESTUDIO
const ParametroEstudio = Parse.Object.extend(CONSTANTS.PACIENTE);
const parametroEstudio = new ParametroEstudio();
parametroEstudio.set(CONSTANTS.IDTIPOESTUDIO, );
parametroEstudio.set(CONSTANTS.IDPARAMETRO, );
parametroEstudio.save();

// ESTUDIO
const Estudio = Parse.Object.extend(CONSTANTS.PACIENTE);
const estudio = new Estudio();
estudio.set(CONSTANTS.OBSERVACIONESESTUDIO, "Se realizó el estudio 2 veces para verificar los datos obtenidos");
estudio.set(CONSTANTS.FECHAESTUDIO, "04/04/2022");
estudio.set(CONSTANTS.CURP, "PICA0304MEVN3");
estudio.set(CONSTANTS.IDTIPOESTUDIO, );
estudio.set(CONSTANTS.IDCOLABORADOR, );
estudio.save();

// RESULTADO
const Resultado = Parse.Object.extend(CONSTANTS.PACIENTE);
const resultado = new Resultado();
resultado.set(CONSTANTS.IDESTUDIO, );
resultado.set(CONSTANTS.IDPARAMETRO, );
resultado.set(CONSTANTS.VALORNUMRESULTADO, 20);
resultado.set(CONSTANTS.VALORBOOLRESULTADO, true);
resultado.set(CONSTANTS.VALORSTRINGRESULTADO, "TANSPARENTE");
resultado.save();

// NOTAMEDICA
const NotaMedica = Parse.Object.extend(CONSTANTS.PACIENTE);
const notaMedica = new NotaMedica();
notaMedica.set(CONSTANTS.FECHANOTAMEDICA);
const notas = {
    exploracion: 'Bulto en la pierna'
}
notaMedica.set(CONSTANTS.NOTAS, notas);
notaMedica.set(CONSTANTS.IDCOLABORADOR,);
notaMedica.set(CONSTANTS.CURP, "PICA0304MEVN3");
notaMedica.save();
*/
/**
 * Script para poblar base de datos con roles del sistema.
 * ejecutar: node dbRoles.js
*/

var Parse     = require('parse/node');
Parse._initialize("app_id", "", "master_key");
Parse.serverURL = 'http://localhost:6535/parse';

let CONSTANTS = require("../constantsProject");

const Rol = Parse.Object.extend(CONSTANTS.ROL);

var roles = [];

var rolAdmin = new Rol();
rolAdmin.set(CONSTANTS.NOMBRE, CONSTANTS.ROLADMIN);
rolAdmin.set(CONSTANTS.DESCRIPCION, "Integrantes de la mesa directiva dentro de NefroVida A.C. o responsable de administrar sistema. Tiene permiso de crear cuenta a colaboradores de la organización.");
roles.push(rolAdmin);

var rolTrabajoSocial = new Rol();
rolTrabajoSocial.set(CONSTANTS.NOMBRE, CONSTANTS.ROLTRABAJOSOCIAL);
rolTrabajoSocial.set(CONSTANTS.DESCRIPCION, "Trabajador Social o encargado de registrar información de pacientes en el sistema.");
roles.push(rolTrabajoSocial);

var rolQuimico = new Rol();
rolQuimico.set(CONSTANTS.NOMBRE, CONSTANTS.ROLQUIMICO);
rolQuimico.set(CONSTANTS.DESCRIPCION, "Químico o encargado de registrar resultados de estudio realizado a paciente junto con sus observaciones respectivas.");
roles.push(rolQuimico);

var rolDoctor = new Rol();
rolDoctor.set(CONSTANTS.NOMBRE, CONSTANTS.ROLDOCTOR);
rolDoctor.set(CONSTANTS.DESCRIPCION, "Doctor que puede tener acceso al resultado de los estudios de laboratorio de los pacientes y puede registrar detalles de una consulta médica.");
roles.push(rolDoctor);

var rolNutriologo = new Rol();
rolNutriologo.set(CONSTANTS.NOMBRE, CONSTANTS.ROLNUTRIOLOGO);
rolNutriologo.set(CONSTANTS.DESCRIPCION, "Nutriologo que puede tener acceso al resultado de los estudios de laboratorio de los pacientes y puede registrar detalles de consulta de nutrición.");
roles.push(rolNutriologo);

var rolPsicologo = new Rol();
rolPsicologo.set(CONSTANTS.NOMBRE, CONSTANTS.ROLPSICOLOGO);
rolPsicologo.set(CONSTANTS.DESCRIPCION, "Psicologo que tiene acceso a los resúmenes de consulta realizados por el resto del personal de NefroVida A.C.");
roles.push(rolPsicologo);

try{
    Parse.Object.saveAll(roles);
    console.log("Roles guardados con éxito")
} catch(error){
    console.log(error.message);
}
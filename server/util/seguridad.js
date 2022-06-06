var CryptoJS   = require("crypto-js");

const keySize = 15360;
const iterations = 100;

/**
 * Funcion para encriptar string utilizando
 * clave.
 * @param {string} msg 
 * @param {string} pass 
 * @returns 
 */
exports.encriptar = function(msg, pass) {
    var salt = CryptoJS.lib.WordArray.random(128/8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
    });

    var iv = CryptoJS.lib.WordArray.random(128/8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    
    });

    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();

	return transitmessage.toString(CryptoJS.enc.Utf8);
}

/**
 * Función para desencriptar string utilizando clave
 * 
 * @param {string} transitmessage 
 * @param {string} pass 
 * @returns 
 */
exports.desencriptar = function(transitmessage, pass){
	var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    var encrypted = transitmessage.substring(64);
    
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })

    return decrypted.toString(CryptoJS.enc.Utf8);
}


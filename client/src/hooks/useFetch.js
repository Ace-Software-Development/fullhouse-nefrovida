/**
 * useFetch es un custom hook de React para
 * poder hacer peticiones al servidor asegurando
 * que se manejarán los tipos de errores correctamente
 * así como asegurar que se enviarán los datos de la
 * session de usuario dentro de la petición.
 * 
 * @param {string} url ruta del servidor a la que se 
 * realizará la petición.
 * 
 * @returns 
 * Este hook retorna httpConfig, una función para
 * armar los parámetros e información del fetch.
 * De igual forma retorna el estado de si está 
 * cargándose la petición, la respuesta recibida
 * por parte del servidor, un mensaje de error o
 * un mensaje en caso de éxito.
 */

import { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';

const useFetch = (url) => {
    // Config para fetch
    const [config, setConfig] = useState(null);
    // metodo de request
    const [method, setMethod] = useState(null);
    // response del fetch
    const [response, setResponse] = useState(null);
    // response del fetch en json
    const [responseJSON, setResponseJSON] = useState(null);
    // Booleano con estado de cargando
    const [loading, setLoading] = useState(false);
    // mensaje de éxito
    const [message, setMessage] = useState(null);
    // mensaje de error
    const [error, setError] = useState(null);
    // id para get o delete
    const [itemId, setItemId] = useState(null);
    // booleano para saber cuando response fue correcta
    const [responseOk, setResponseOk] = useState(false);

    /**
     * httpConfig Función para armar petición de fetch
     * dependiendo de método deseado. Se usa useState
     * para almacenar método, configuración y id en caso
     * de que exista.
     * 
     * @param {object} data Pues ser el body en caso de POST
     * o el objectId en caso de GET o DELETE.
     * 
     * @param {string} methodLocal método para hacer el fetch.
     */
    const httpConfig = async(data, methodLocal) => {
        // Limpiar variables de error y mensaje.
        await setMessage("");
        await setError("");
        await setResponseOk(false);

        // Si se desea realizar un POST
        if (methodLocal === 'POST') {
            var session = {};
            // Intenta crear objeto con datos de sessión.
            try {
                session = {
                    "session": {
                        "sessionToken": ReactSession.get("sessionToken")
                    }
                };
            } catch (err) {
                setMessage("No hay una sesión de usuario activa");
            }
            
            await setMethod(methodLocal);
            // Armar configuración de POST con datos y sessión junta en body.
            await setConfig( {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    ...session
                })
            });

        } 
        // Se se desea realizar un DELETE
        else if (methodLocal === 'DELETE') {
            await setMethod(methodLocal);
            await setItemId(data);
            await setConfig( {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        } 
        // Si se desea realizar un GET
        else if (methodLocal === 'GET') {
            console.log("data: " + data);
            await setItemId(data);
            await setMethod(methodLocal);
            await setConfig( {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    /**
     * Hook para realizar fetch y almacenar respuesta del mismo
     * una vez se detecte que la configuración de la petición
     * ya fue creada correctamente al llamar a función exportada
     * de configuración del hook.
     */
    useEffect(() => {
        /**
         * httpRequest función asíncrona para realizar fetch
         * y alamacenar respuesta definiendo variables de 
         * estado según avanza petición.
         */
        const httpRequest = async () => {
            // Si método fue POST
            if (method === 'POST') {
                // Definir que se empieza a cargar fetch
                setLoading(true);
                try {
                    // Realizar fetch con ruta y configuración definidas
                    let fetchOptions = [url, config];
                    const res = await fetch(...fetchOptions);
                    const json = await res.json();
                    // Almacenar respuestas del fetch
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.');
                }
                // Definir que petición terminó de cargarse.
                setLoading(false);

            } 
            // Si método fue GET
            else if (method === 'GET') {
                setLoading(true);
                try {
                    // Armar ruta con datos de session y id
                    const getUrl = `${url}/?token=${ReactSession.get("sessionToken")}&id=${itemId}`;
                    const res = await fetch(getUrl, config);
                    const json = await res.json();
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.');
                }
                setLoading(false);

            } 
            // Si métofo fue DELETE
            else if (method === 'DELETE') {
                setLoading(true);
                try {
                    // Armar ruta con datos de session y id
                    const deleteUrl = `${url}/${ReactSession.get("sessionToken")}/${itemId}`;
                    const res = await fetch(deleteUrl, config);
                    const json = await res.json();
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.');
                }
                setLoading(false);
            }
        }
        // Llamar a ejecutar función para realizar fetch
        httpRequest();

    }, [config]);


    /**
     * Hook para validar respuesta de petición
     * que se ejecuta una vez se haya recbido y 
     * guardado objeto de respuesta.
     * 
     * Maneja distintos mensajes de error para 
     * cargas páginas correspondientes.
     * 
     * Almacena mensaje de éxito o error que son
     * usados en páginas que llamas al hook principal
     * para conocer si fue una petición exitosa o 
     * con error.
     */
    useEffect(() => {
        if(!response) return;

        // Si petición retornó error.
        if(!response.ok) {
            if (response.status === 401) {
                // TODO cuando esté cerrar sesion llamar a cerrarSesion
                window.location.href = "/iniciarSesion";
            } else if (response.status === 403) {
                window.location.href = "/403";
            } else if (response.status === 404) {
                window.location.href = "/404";
            }
            setError(responseJSON.message);
        }
        // Si petición fue correcta
        else {
            setMessage(responseJSON.message);
            setResponseOk(true);
        }

    }, [responseJSON]);

    return { httpConfig, loading, responseJSON, error, message, responseOk };
}

export default useFetch;
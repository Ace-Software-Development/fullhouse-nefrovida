import { useState, useEffect } from 'react'
import { ReactSession } from 'react-client-session'

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

    const httpConfig = async(data, methodLocal) => {
        await setMessage("");
        await setError("");
        if (methodLocal === 'POST') {
            var session = {}
            try {
                session = {
                    "session": {
                        "sessionToken": ReactSession.get("sessionToken")
                    }
                }
            } catch (err) {
                setMessage("No hay una sesión de usuario activa");
            }
            
            await setMethod(methodLocal);
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

        } else if (methodLocal === 'DELETE') {
            await setMethod(methodLocal)
            await setItemId(data)
            await setConfig( {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        } else if (methodLocal === 'GET') {
            await setItemId(data)
            await setMethod(methodLocal)
            await setConfig( {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    useEffect(() => {
        const httpRequest = async () => {
            if (method === 'POST') {
                setLoading(true);
                try {
                    let fetchOptions = [url, config]
                    const res = await fetch(...fetchOptions);
                    const json = await res.json();
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.')
                }
                setLoading(false)

            } else if (method === 'GET') {
                setLoading(true);
                try {
                    const getUrl = `${url}/?token=${ReactSession.get("sessionToken")}&id=${itemId}`
                    const res = await fetch(getUrl, config)
                    const json = await res.json();
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.')
                }
                setLoading(false)

            } else if (method === 'DELETE') {
                setLoading(true);
                try {
                    const deleteUrl = `${url}/${ReactSession.get("sessionToken")}/${itemId}`
                    const res = await fetch(deleteUrl, config)
                    const json = await res.json();
                    await setResponse(res);
                    await setResponseJSON(json);

                } catch (error) {
                    await setError('Error de conexión. Inténtelo de nuevo.')
                }
                setLoading(false)
            }
        }
        httpRequest()

    }, [config])

    useEffect(() => {
        if(!response) return

        if(!response.ok) {
            if (response.status === 401) {
                window.location.href = "/iniciarSesion";
            } else if (response.status === 403) {
                window.location.href = "/403";
            } else if (response.status === 404) {
                window.location.href = "/404";
            }
            setError(responseJSON.message)
        }
        else {
            setMessage(responseJSON.message)
        }

    }, [responseJSON])

    return { httpConfig, loading, responseJSON, error, message }
}

export default useFetch;
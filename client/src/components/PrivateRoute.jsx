/**
 * PrivateRoute protege rutas que requieren
 * al usuario iniciarSesion para evitar que
 * un usuario no autenticado ingrese a páginas
 * de la aplicación privadas.
 * En caso de que el usuario ya se encuentre
 * autenticado se va a poder cargar ruta con
 * página deseada.
 */

import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

const PrivateRoute = () => {
    try {
        const sess = ReactSession.get("rol");
        const token = ReactSession.get("sessionToken");
        if (sess && token) {
            return <Outlet />;
        }
        else {
            return <Navigate to="/iniciarSesion" />;
        }
    } catch(err) {
        return <Navigate to="/iniciarSesion" />;
    }
}

export default PrivateRoute;
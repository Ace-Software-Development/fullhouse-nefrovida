/**
 * NoAuthRoute protege ruta de iniciarSesion
 * en caso de que el usuario ya se encuentre
 * autenticado con la finalidad de evitar que 
 * intente iniciar sesión cuando ya tiene una
 * activa.
 */

import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

const NoAuthRoute = () => {
    try {
        const sess = ReactSession.get("rol");
        if (!sess) {
            return <Outlet />;
        } else {
            return <Navigate to="/" />;
        }
    } catch(err) {
        return <Outlet />;
    }
}

export default NoAuthRoute;
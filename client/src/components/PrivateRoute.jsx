import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

const PrivateRoute = () => {
    try {
        const sess = ReactSession.get("rol");
        return <Outlet />;
    } catch(err) {
        return <Navigate to="/iniciarSesion" />;
    }
}

export default PrivateRoute;
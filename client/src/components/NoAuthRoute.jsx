import { React } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ReactSession } from 'react-client-session'

const NoAuthRoute = () => {
    try {
        const sess = ReactSession.get("rol");
        return <Navigate to="/" />;
    } catch(err) {
        return <Outlet />;
    }
}

export default NoAuthRoute;
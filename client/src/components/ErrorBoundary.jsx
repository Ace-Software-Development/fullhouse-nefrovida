/**
 * ErrorBoundary se encarga de detectar errores de React
 * para evitar que la aplicación se rompa. 
 * En caso de detectar un error carga página de error 404.
 */

import React from "react";
import NotFound from "../pages/error/404notFound";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <NotFound />;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;

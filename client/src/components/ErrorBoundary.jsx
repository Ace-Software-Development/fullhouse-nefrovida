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

/**
 * Página de error que se llama cuando servidor
 * retorna respuesta con status 404 o sucedió un
 * error inesperado que rompió aplicación o se 
 * intenta acceder a una ruta inexistente.
 */

import Navbar from '../../components/Navbar';
import Main from '../../components/Main'

function NotFound() {
    return (
        <div>
            <Navbar/>
            <Main>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>Lo sentimos, Página no encontrada!</h2>
                        <p>Es posible que la página que busca haya sido eliminada, haya cambiado de nombre o no esté disponible temporalmente.</p>
                        <a href="/">Regresar a Página Principal</a>
                    </div>
                </div>
            </Main>
        </div>
    )
}

export default NotFound;

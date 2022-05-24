import Navbar from '../../components/Navbar';
import Main from '../../components/Main'

function Forbidden() {
    return (
        <div>
            <Navbar/>
            <Main>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>403</h1>
                        </div>
                        <h2>Acceso denegado!</h2>
                        <p>El usuario actual no cuenta con permisos para realizar dicha acción.</p>
                        <a href="/">Regresar a Página Principal</a>
                    </div>
                </div>
            </Main>
        </div>
    )
}

export default Forbidden;


                
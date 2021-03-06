/**
 * Navegación principal del sistema (engloba las historias consultar colaboradores, consultar pacientes
 * y consultar tipos de estudio)
 */
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import ConsultarPacientes from './ConsultarPacientes'
import { ReactSession } from 'react-client-session';
import TiposEstudio from './TiposEstudio';
import ConsultarColaborador from './ConsultarColaborador';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            { ReactSession.get('rol') === 'admin' &&
                <div>
                    <ConsultarColaborador/>
                    <TiposEstudio/>
                    <ConsultarPacientes/>
                </div>
                
            }
            { ReactSession.get('rol') !== 'admin' &&
                <ConsultarPacientes/>
            }
            </Main>
        </div>
    )
}

export default Home;
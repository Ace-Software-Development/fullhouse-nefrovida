import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Sidenav from '../components/Sidenav'
import RegistrarColaborador from '../pages/RegistrarColaborador'
import ConsultarPacientes from './ConsultarPacientes'
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar>
                <Sidenav/>
            </Navbar>
            <Main>
            <br/><br/>
            { ReactSession.get('rol') === 'admin' &&
                <RegistrarColaborador/>
            }
            { ReactSession.get('rol') !== 'admin' &&
                <ConsultarPacientes/>
            }
            </Main>
        </div>
    )
}

export default Home;
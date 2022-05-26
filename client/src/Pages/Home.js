import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav'
import Main from '../components/Main'
import ConsultarPacientes from './ConsultarPacientes'
import BtnEditRegis from '../components/BtnEditRegis'
import FormColaborador from './FormColaborador'
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar>
                <Sidenav/>
            </Navbar>
            <Main>
            <ConsultarPacientes/>
                <br/><br/>
                { ReactSession.get('rol') === 'trabajoSocial' &&
                    <Link to = "/paciente">
                        <BtnEditRegis icono = "person_add" texto = "Registrar paciente" posicion = "left"/>
                    </Link>
                }
                <FormColaborador/>
            </Main>
        </div>
    )
}

export default Home;
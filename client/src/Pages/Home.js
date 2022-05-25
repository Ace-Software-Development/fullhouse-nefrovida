import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'
import Main from '../components/Main'
import BtnEditRegis from '../components/BtnEditRegis'
import FormColaborador from './FormColaborador'
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
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
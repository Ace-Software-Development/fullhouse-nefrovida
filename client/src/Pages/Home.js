import Navbar from '../components/Navbar';
import Main from '../components/Main';
import FormColaborador from './FormColaborador';
import BtnEditRegis from '../components/BtnEditRegis';
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <Link to = "/registrarEstudio">
                <BtnEditRegis icono = "add" texto = "Registrar paciente" posicion = "left"/>
            </Link>
            { ReactSession.get('rol') === 'quimico' &&
                <Link to = "/registrarEstudio">
                    <BtnEditRegis icono = "add" texto = "Registrar paciente" posicion = "left"/>
                </Link>
            }
            <FormColaborador/>
            </Main>
        </div>
    )
}

export default Home;
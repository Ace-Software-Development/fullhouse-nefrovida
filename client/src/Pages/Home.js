import Navbar from '../components/Navbar';
import Main from '../components/Main';
import FormColaborador from './FormColaborador';
import BtnEditRegis from '../components/BtnEditRegis';
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            { ReactSession.get('rol') === 'quimico' &&
                <Link to = "/registrarEstudio">
                    <BtnEditRegis icono = "add" texto = "Registrar paciente" posicion = "left"/>
                </Link>
            }
            <FormColaborador/>
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
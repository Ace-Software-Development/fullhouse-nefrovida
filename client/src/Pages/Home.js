import Navbar from '../components/Navbar';
import Main from '../components/Main'
import FormColaborador from './FormColaborador'
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <p>Bienvenido: {ReactSession.get("nombre")} {ReactSession.get("apellido")} , usted tiene rol de {ReactSession.get("rol")}</p>
            <FormColaborador/>
            </Main>
        </div>
    )
}

export default Home;
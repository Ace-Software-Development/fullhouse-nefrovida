import Navbar from '../components/Navbar';
import Main from '../components/Main';
import FormColaborador from './FormColaborador';
import BtnEditRegis from '../components/BtnEditRegis';
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom';
import Sidenav from '../components/Sidenav'

import ConsultarPacientes from './ConsultarPacientes'
function Home() {
    return (
        <div>
            <Navbar>
                <Sidenav/>
            </Navbar>
            <Main>
                <br/><br/>
                <ConsultarPacientes/>
            </Main>
        </div>
    )
}

export default Home;
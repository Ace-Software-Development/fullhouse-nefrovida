import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Sidenav from '../components/Sidenav'

import ConsultarPacientes from './ConsultarPacientes'

import ConsultarColaborador from './ConsultarColaborador'

function Home() {
    return (
        <div>
            <Navbar>
                <Sidenav/>
            </Navbar>
            <Main>
                <ConsultarColaborador/> 
                <br/><br/>
                {/* <ConsultarPacientes/> */} 
            </Main>
        </div>
    )
}

export default Home;
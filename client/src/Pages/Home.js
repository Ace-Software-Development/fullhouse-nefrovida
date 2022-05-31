import Navbar from '../components/Navbar';
import Main from '../components/Main';
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
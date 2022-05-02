import Navbar from '../components/Navbar';
import Main from '../components/Main'
import ConsultarPacientes from './ConsultarPacientes'

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <ConsultarPacientes/>
            </Main>
        </div>
    )
}

export default Home;
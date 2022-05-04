import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'
import Main from '../components/Main'
import BtnEditRegis from '../components/BtnEditRegis'
import FormColaborador from './FormColaborador'

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <Link to = "/paciente">
                <BtnEditRegis icono = "person_add" texto = "Registrar paciente" posicion = "left"/>
            </Link>
            <br></br>
            <br></br>
            <FormColaborador/>
            </Main>
        </div>
    )
}

export default Home;
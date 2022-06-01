import Navbar from '../components/Navbar';
import Main from '../components/Main'
import { ReactSession } from 'react-client-session';
import RegistrarColaborador from './RegistrarColaborador';


function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
                <RegistrarColaborador/>
            </Main>
        </div>
    )
}

export default Home;
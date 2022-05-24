import Navbar from '../components/Navbar';
import Main from '../components/Main'
import FormColaborador from './formColaborador'
import { ReactSession } from 'react-client-session';

function Home() {
    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
                <FormColaborador/>
            </Main>
        </div>
    )
}

export default Home;
import Navbar from './Navbar';
import Main from '../components/Main'
import FormColaborador from './FormColaborador'

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
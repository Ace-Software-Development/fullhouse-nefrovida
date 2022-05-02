import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import CardTitulo from '../components/CardTitulo'
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';

function VistaDetalle() {
    let { curp } = useParams()

    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <Link to = '/'>
                <BtnRegresar/>
            </Link>
            <br/><br/>
            <Card>
                <CardTitulo icono="person" titulo="Detalle de paciente"/>
            </Card>
            </Main>
        </div>
    )
}

export default VistaDetalle;
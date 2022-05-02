import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import CardTitulo from '../components/CardTitulo'
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';
import ContenidoDetallesPx from '../components/ContenidoDetallesPx';
function VistaDetalle() {
    const px= {nombre: "Quehuevos", materno: "lostuyos", paterno: "cocidos", sexo:"hHUEVOTES", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}
const detallesPx= <ContenidoDetallesPx paciente= {px}/>

    return (
        <div>
            <Navbar/>
            <Main>
            <br/><br/>
            <Link to = '/'>
                <BtnRegresar/>
            </Link>
            <br/><br/>
            <CardTitulo icono="person" titulo="Detalle de paciente"/>
            <Card children= {detallesPx}/> 
            </Main>
        </div>
    )
}

export default VistaDetalle;
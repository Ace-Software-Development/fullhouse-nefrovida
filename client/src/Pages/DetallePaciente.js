import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Main from '../components/Main'
import CardTitulo from '../components/CardTitulo'
import BtnRegresar from '../components/BtnRegresar';
import Card from '../components/Card';
import ContenidoDetallesPx from '../components/ContenidoDetallesPx';
function VistaDetalle() {
    let { curp } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        getPaciente();
    }, [])

    async function getPaciente() {
        const response = await fetch('http://localhost:6535/paciente/detalle/' + curp, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        const detallePaciente = await response.json()
        setIsLoading(false)
        if(!response.ok) {
            window.alert(detallePaciente.message);
            return;
        }
        setPaciente(detallePaciente.data.data)
    }
    //const paciente= {nombre: "Quehuevos", materno: "lostuyos", paterno: "cocidos", sexo:"hHUEVOTES", rol: "La PPAP", telefono: "4425672356", detalle:"http://www.youtube.com/", correo: "ayuda@sos.com"}

    //const detallesPx= <ContenidoDetallesPx paciente= {px}/>

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
                { isLoading ? <div>Cargado...</div> : <ContenidoDetallesPx paciente={paciente}/>}
            </Card>
            </Main>
        </div>
    )
}

export default VistaDetalle;
/**
 * Consultar tipo de Estudio (Administrador):
 * En esta vista, el administrador puede consultar
 * los detalles de un estudio, eliminar y editar el
 * estudio.
 * 
 * Los datos llegan desde la base de datos y se muestran.
*/

import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import LineaParametros from '../components/LineaParametros';
import CardEstudio from '../components/CardEstudio';
import { ParametroTexto, ParametroRango, ParametroBooleano} from '../components/ParametroTipoEstudio';
import { useParams } from 'react-router-dom';

export default function ConsultarTipoEstudio() {
    const params = useParams();

    const [tipoEstudio, setTipoEstudio] = useState({})
    const [parametros, setParametros] = useState([])
    const [errorFetch, setErrorFetch] = useState('');
    const [isLoading, setIsLoading] = useState('');
    
    function listaParametros() {
        return parametros.map(el => {
            if(el.idParametro.idTipoValor.nombre === "Positivo/Negativo"){
                return <ParametroBooleano nombreParametro = { el.idParametro.nombre } valorBool ={el.idParametro.valorBool} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId} />
            }
            else if(el.idParametro.idTipoValor.nombre === "Texto"){
                return <ParametroTexto nombreParametro = {el.idParametro.nombre} valorString = {el.idParametro.valorString} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            else if (el.idParametro.idTipoValor.nombre === "Numérico"){
                return  <ParametroRango nombreParametro = {el.idParametro.nombre}valorMin = {el.idParametro.valorMin} valorMax = {el.idParametro.valorMax}  unidad = {el.idParametro.unidad} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            
        })
        
    }

    async function getTipoEstudio(id) {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/'+ id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                setErrorFetch(misDatos.message);
                return;
            }

            misDatos = misDatos.data.data;
            setTipoEstudio(misDatos.pop());
            setParametros(misDatos);
            
        } catch(e) {
            setIsLoading(false);
            setErrorFetch('Error de conexión. Inténtelo de nuevo.');
        }
    }
    useEffect(() => {
        getTipoEstudio(params.idTipoEstudio);
        setIsLoading(true);
    }, []);


    return(
        
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del tipo de estudio"/>
                <ContainerForm>
                    <BtnRegresar/>
                    <br/><br/>  
                    <div className="row div-detalles-estudio">
                        <div className="col s6 l6 left-align">
                            <div className="detalles-estudio">
                                <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> description </i>          
                                <div className="detalles-lista negrita-grande c-393939">{ tipoEstudio.nombre}</div><br/>
                                <div className="detalles-lista negrita-pequeno c-908F98">{ tipoEstudio.descripcion }</div>
                            </div>
                        </div>
                        <div className='col s6 l6 numero-parametros'>
                            <i className="material-icons icon-separator small c-000000">format_list_numbered</i><div className="detalles-lista sn-pequeno c-908F98 left-align">{ parametros.length } parámetros</div>
                        </div>
                    </div>
                    
                    <div className='identificacion-registrar'/>

                    <LineaParametros>
                        { listaParametros()}
                    </LineaParametros>
                        
                        
                        {/* <BtnEliminar texto='Eliminar estudio' posicion='right'/> */}
                        {/* <BtnEditRegis icono='create' texto='Editar estudio'/>               */}
                    
                </ContainerForm>
                { errorFetch 
                    && <div> <div className="red-text center"> <strong> { errorFetch } </strong> </div> <br/><br/> </div>
                }
                </Card>
            </Main>
        </div>
        )
    }
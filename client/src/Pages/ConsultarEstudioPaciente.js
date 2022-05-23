/**
 * Consultar estudio del paciente:
 * Esta vista se ultiliza para el químico, doctor y nutriologa con la finalidad
 * de consultar los estudios del paciente.
 * Se trata de una card que desglosa la información solicitada de los estudios
 * de cada paciente.
 */

import { useEffect, useState } from 'react';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import validarIniciarSesion from '../util/validators/validarIniciarSesion';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnEditRegis from '../components/BtnEditRegis';
import BtnEliminar from '../components/BtnEliminar';
import ParametroEstudioPaciente from '../components/ParametroEstudioPaciente';

export default function ConsultarEstudioPaciente() {
    // Hook que se ejecuta para almacenar la información del estudio.
    const [estudio, setEstudio] = useState({})

    // Funcion para obtener los parametros del estudio.
    function getParametrosEstudio() {
        let parametros = estudio.parametros;
        console.log(parametros);
        if(parametros !== undefined) {
            return parametros.map(el => {
                return <ParametroEstudioPaciente parametro={el.nombreParametro} valor={el.valorResultado} unidad={el.unidadParametro} referencia= {el.valorReferenciaParametro}></ParametroEstudioPaciente>
            })
        }
    }
    
    // Funcion que obtiene el estudio correspondiente al id.
    async function getEstudio(id) {
        try {
            const response = await fetch('http://localhost:6535/consultarEstudioPaciente/1', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            let misDatos = await response.json();

            misDatos = misDatos.estudio;
            if (!response.ok) {
                return;
            }
            setEstudio(misDatos);
            console.log(misDatos);

        } catch(e) {
            console.log(e)
        }
    }
    // Hook que obtiene el estudio.
    useEffect(() => {
        getEstudio();
        //getParametrosEstudio();
    }, [])

    return(
        <div className="row ContainerForm left-align">
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="description" titulo="Detalle del estudio"/>
                    <ContainerForm>
                   {/* <BtnRegresar url="/"/><br/><br/> */}
                    
                    
                    
                        <div align="left">               
                            <div className="detalles-lista negrita-grande c-64646A left-align"> {estudio.nombreTipoEstudio}  </div><span>  {estudio.fechaEstudio}</span><br/>
                            <div className="detalles-lista light-pequeno c-717079 left-align">{estudio.descripcionTipoEstudio}</div>
                        </div>
                        <br/>
                        <div className='identificacion-registrar'/>


                    
                    <LineaCampos>
                        {getParametrosEstudio()}
                        
                    </LineaCampos>

                    
                    <br/>
                    <LineaCampos>
                        <div align="left">
                        <div className='detalles-usuario'>
                        <i className="material-icons icon-separator small c-000000">remove_red_eye</i><div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div><br/>
                        </div>
                        <br/><br/>
                            <div className="detalles-lista negrita-pequeno c-64646A left-align">{estudio.observacionesEstudio}</div>
                        </div>
                    </LineaCampos>
                    <br></br>
                    {/*<BtnEliminar texto='Eliminar estudio' posicion='right'/> */}
                    {/*<BtnEditRegis icono='create' texto='Editar estudio'/>  */}          
                        
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import LineaCampos from '../components/LineaCampos';
import Input from '../components/Input';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import { EntradaParametroBool, EntradaParametroNum, EntradaParametroString } from '../components/EntradaParametro';

export default function RegistrarEstudio() {

    const [tipoEstudio, setTipoEstudio] = useState({})
    const [parametros, setParametros] = useState([])
    const [isLoading, setIsLoading] = useState("");
    
    function listaParametros() {
        return parametros.map(el => {
            if (el.idParametro.idTipoValor.nombre === "Numérico"){
                return  <EntradaParametroNum nombreParametro = {el.idParametro.nombre} valorA = {el.idParametro.valorA} valorB = {el.idParametro.valorB} unidad = {el.idParametro.unidad} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }
            else if(el.idParametro.idTipoValor.nombre === "Positivo/Negativo"){
                return <EntradaParametroBool nombreParametro = { el.idParametro.nombre } valorBool ={el.idParametro.valorBool} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId} />
            }
            else if(el.idParametro.idTipoValor.nombre === "Texto"){
                return <EntradaParametroString nombreParametro = {el.idParametro.nombre} valorString = {el.idParametro.valorString} codigo = {el.idParametro.codigo} key = {el.idParametro.objectId}/>
            }            
        })
        
    }

    async function getTipoEstudio(id) {

        setIsLoading(true);


        try {
            const response = await fetch('http://localhost:6535/tipoEstudio/' + id, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            console.log('RESPONSE', response);
            let misDatos = await response.json();
            console.log('MISDATOS', misDatos);

            misDatos = misDatos.data.data;
            if (!response.ok) {
                return;
            }

            console.log('MISDATOS2', misDatos);
            setTipoEstudio(misDatos.pop());
            setParametros(misDatos);

        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getTipoEstudio('oa4rkaUoYk');
    }, [])

    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let fecha = cDay + "/" + cMonth + "/" + cYear ;

    return(
        <div className="row ContainerForm left-align">
        <div>
            <Navbar/>
            <Main>
                <br></br>    
                <Card>
                <CardTitulo icono="note_add" titulo="Registrar estudio"/>
                    <ContainerForm>
                    <Link to = "/">
                    <BtnRegresar/><br/><br/>
                    </Link>
                    {
                        isLoading &&
                        <div class="preloader-wrapper small active">
                            <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>
                        </div>
                    }
                        <div align="left">               
                            <div className="detalles-lista negrita-grande c-64646A left-align">{ tipoEstudio.nombre }  </div><span className='subrayado c-2E7EC8' >  { fecha } </span><br/>
                            <div className="detalles-lista light-pequeno c-908F98 left-align">{ tipoEstudio.descripcion }</div>
                        </div>
                        <br/>
                        <div className='identificacion-registrar'/>
                        <br/>

                        <LineaCampos>
                            
                            { listaParametros()}

                            {/*<EntradaParametro nombreValor = "Positivo/Negativo" nombreParametro = "Viscoso" codigo = "HA"/>*/}
                            {/*<EntradaParametro nombreValor = "Numérico" nombreParametro = "Glucosa" unidad = 'mg/dL' codigo = "XD"/>*/}
                            {/*<EntradaParametro nombreValor = "Texto" nombreParametro = "Color" codigo = "TEST"/>*/}
                            {/*<EntradaParametro nombreValor = "Numérico" nombreParametro = "Sangre" unidad = 'ml' codigo = "DX"/>*/}
                            {/*<EntradaParametro nombreValor = "Positivo/Negativo" nombreParametro = "Viscoso" codigo = "AH"/>*/}
                            {/*<EntradaParametro nombreValor = "Texto" nombreParametro = "Nuevo Color" codigo = "TEST2"/>*/}
                        
                        </LineaCampos>
                        
                        <div className='identificacion-registrar'/>
                        <br/>
                        <LineaCampos>
                            <div align="left">
                            <div className='detalles-usuario'>
                            <i className="material-icons icon-separator small c-000000">remove_red_eye</i><div className="detalles-lista negrita-grande c-64646A left-align">Observaciones:</div><br/>
                            </div>
                            <Input 
                                id="observaciones" 
                                label="Ingresa aquí la observación del estudio" 
                                tamano="m12 s12"/>
                                </div>
                        </LineaCampos>
                        <br/>
                        <BtnGuardar/>              
                    </ContainerForm>
                </Card>
            </Main>
            </div>
        </div>
        )
    }
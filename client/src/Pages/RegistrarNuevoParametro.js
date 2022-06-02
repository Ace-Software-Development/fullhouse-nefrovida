import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import Card from '../components/Card';
import ContainerForm from '../components/ContainerForm';
import CardTitulo from '../components/CardTitulo';
import Navbar from '../components/Navbar';
import BtnRegresar from '../components/BtnRegresar';
import BtnGuardar from '../components/BtnGuardar';
import Input from '../components/Input';
import Select from '../components/Select';
import LineaCampos from '../components/LineaCampos';


export default function RegistrarNuevoParametro() {


return(
    <div className="row ContainerForm left-align">

    <div>
        <Navbar/>
        <Main>
            <br/><br/><br/><br/><br/><br/><br/>    
            <Card>
            <CardTitulo titulo="Crear nuevo parámetro"/>
                <ContainerForm>
                <Link to = "/">
                <BtnRegresar/>
                <br/><br/>
                </Link>
                { /*isLoading && (
                    <div className="center">
                        <br/><br/><br/>
                        <div class="preloader-wrapper big active">
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
                        <div class="texto-grande blue-text text-darken-1">Cargando formulario</div>
                        <br/><br/><br/>
                    </div>
                
                )*/}
                {
                    //!isLoading && !errorFetch ?
                    <form
                        //id = "main-login"
                        //action = 'http://localhost:6535/colaboradores'
                        //method = 'post'
                        //onSubmit = { handleSubmit(onSubmit) }
                        >
                        <LineaCampos>
                            <Input 
                                id = "nombre" 
                                label = "Nombre-Parámetro 1" 
                                type="text"
                                tamano = "m3 s12" 
                                //onChange = { handleChange }
                                //elError = { errors.usuario && errors.usuario?.message }
                                maxLength = "20"
                                requerido = {true}
                            />
                            <Select 
                                id = "parametro" 
                                label = "Tipo de parámetro" 
                                tamano = "m3 s12"
                                value = ""
                                arr = { [{value: "sangre", option: "Sangre"}, {value: "glucosa", option: "Glucosa"}] }
                                //handleChange = { handleChange }
                                //elError = { errors.sexo && errors.sexo?.message }
                                requerido = { true }
                            />
                            <Input 
                                id = "rango" 
                                label = "¿Tiene rango?" 
                                type="text"
                                tamano = "m3 s12"
                                //onChange = { handleChange }
                                //elError = { errors.apellidoPaterno && errors.apellidoPaterno?.message }
                                requerido = {true}
                            />

                        </LineaCampos>

                        <LineaCampos>
                            <Input 
                                id = "valInicial" 
                                label = "Valor inicial" 
                                type = "text"
                                tamano = "s12 m2"
                                //onChange = { handleChange }
                                maxLength = "10"
                                min = "0"
                                //elError = { errors.telefono && errors.telefono?.message }
                            />
                            <Input 
                                id = "ValFinal" 
                                label = "Valor final" 
                                type = "text"
                                tamano = "s12 m2"
                                //onChange = { handleChange }
                                maxLength = "10"
                                min = "0"
                                //elError = { errors.telefono && errors.telefono?.message }
                            />
                            <Select 
                                id = "unidad" 
                                label = "Unidad" 
                                tamano = "s12 m2"
                                value = ""
                                arr = { [{value: "ml", option: "ml"}, {value: "mg/dL", option: "mg/dL"}] }
                                //handleChange = { handleChange }
                                //elError = { errors.sexo && errors.sexo?.message }
                                requerido = { true }
                            />
                            <Input 
                                id = "codigo" 
                                label = "Código" 
                                type = "text"
                                tamano = "s8 m4"
                                //onChange = { handleChange }
                                maxLength = "10"
                                min = "0"
                                //elError = { errors.telefono && errors.telefono?.message }
                            />

                        </LineaCampos>
                        <BtnGuardar/>
                    </form>
                    //: null
                }            
                </ContainerForm>
            </Card>
        </Main>
        </div>
    </div>
    )
}
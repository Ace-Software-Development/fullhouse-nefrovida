import { useEffect, useState } from 'react';
import Input from './/Input'
import Select from './Select'

const EntradaParametroNum = ({ nombreParametro, valorA, valorB, unidad, codigo }) => {
    return(
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: { valorA } - { valorB } { unidad }
            </div>
            <br/><br/>
        <Input 
            id="parametroNum"
            type= "number"
            label="Valor"
            tamano="m6 s6"
            requerido = { true }/>
            <br/>
            <div className="detalles-lista negrita-pequeno c-000000 left-align">{ unidad }</div>
            <br/><br/><br/><br/>
        </div>                             
    )
}

const EntradaParametroBool = ({ nombreParametro, valorBool, codigo } ) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: { valorBool ? "Positivo" : "Negativo" }
            </div>
            <br/><br/>
        <Select
            id="parametroBool"
            label="Valor"
            value=""
            arr={[{value: "positivo", option: "Positivo"}, {value: "negativo", option: "Negativo"}]}
            tamano="m6 s6"
            requerido = { true }/>
            <br/><br/><br/>
        </div>     
    )

}

const EntradaParametroString = ({ nombreParametro, valorString, codigo }) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: {valorString}
            </div>
            <br/><br/>
        <Input 
            id="parametroBool"
            type= "text"
            label="Valor"
            tamano="m6 s6"
            maxlength="25"
            requerido = { true }/>
            <br/><br/><br/>
        </div>
    )
}

export {EntradaParametroNum, EntradaParametroBool, EntradaParametroString};



/*<div className="col s7 l6 identificacion-usuario">
        <div align="left">
        <div className='detalles-usuario'>
        <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">{ parametro }</div><br/>
        </div><br></br>
        <Input 
            id="username"
            type="number" 
            label="Valor"
            tamano="m8 s12"/>
            <br></br>
            <div className="detalles-lista negrita-pequeno c-908F98 left-align">{ unidad }</div>
            </div>
            </div>*/   
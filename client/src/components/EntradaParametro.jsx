import { useEffect, useState } from 'react';
import Input from './/Input'
import Select from './Select'

const EntradaParametroNum = ({ id, nombreParametro, valorMin, valorMax, unidad, codigo, handleChange, elError }) => {
    return(
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: { valorMin } - { valorMax } { unidad }
            </div>
            <br/><br/>
        <Input 
            id = { id }
            name = { id }
            type= "number"
            label="Valor"
            tamano="m6 s6"
            requerido = { true }
            onChange = { handleChange }
        />
        <span className="helper-text left red-text">
            { elError }
        </span>
            <br/>
            <div className="detalles-lista negrita-pequeno c-000000 left-align">{ unidad }</div>
            <br/><br/><br/><br/>
        </div>                             
    )
}

const EntradaParametroBool = ({ id, nombreParametro, valorBool, codigo, handleChange, elError } ) => {
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
            id= { id }
            name = { id }
            label="Valor"
            value=""
            arr={[{value: "positivo", option: "Positivo"}, {value: "negativo", option: "Negativo"}]}
            tamano="m6 s6"
            requerido = { true }
            handleChange = { handleChange }
        />
        <span className="helper-text left red-text">
            { elError }
        </span>
            <br/><br/><br/>
        </div>     
    )

}

const EntradaParametroString = ({ id, nombreParametro, valorString, codigo, handleChange, elError }) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: { valorString }
            </div>
            <br/><br/>
        <Input 
            id= { id }
            name = { id }
            type= "text"
            label="Valor"
            tamano="m6 s6"
            maxLength="25"
            requerido = { true }
            onChange = { handleChange }
        />
        <span className="helper-text left red-text">
            { elError }
        </span>
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
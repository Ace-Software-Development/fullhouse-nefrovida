import { useEffect, useState } from 'react';
import Input from './/Input'
import Select from './Select'
import LineaCampos from './LineaCampos';

const EntradaParametroNum = ({ id, nombreParametro, valorMin, valorMax, unidad, codigo, handleChange, elError }) => {
    return(
        <div className='col s12 l6 espacio-vertical left-align no-margin-left'>
            <br/>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista texto-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de Referencia: { valorMin } - { valorMax } { unidad }
            </div>
            <br/><br/>
            <LineaCampos>
                <Input 
                    id = { id }
                    name = { id }
                    type= "number"
                    label="Valor"
                    tamano="m6 s6"
                    requerido = { true }
                    onChange = { handleChange }
                    elError = { elError }
                />
            </LineaCampos>
            
        <div class="identificacion-registrar"/>
        </div>                             
    )
}

const EntradaParametroBool = ({ id, nombreParametro, valorBool, codigo, handleChange, elError } ) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align no-margin-left'>
            <br/>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista texto-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de Referencia: { valorBool ? "Positivo" : "Negativo" }
            </div>
            <br/><br/>
            <LineaCampos>
                <Select
                    id= { id }
                    name = { id }
                    label="Valor"
                    value=""
                    arr={[{value: "positivo", option: "Positivo"}, {value: "negativo", option: "Negativo"}]}
                    tamano="m6 s6"
                    requerido = { true }
                    handleChange = { handleChange }
                    elError = { elError }
                />
            </LineaCampos>
            <div class="identificacion-registrar"/>
        </div>     
    )

}

const EntradaParametroString = ({ id, nombreParametro, valorString, codigo, handleChange, elError }) => {
    return (
        <div className='col s12 l6 espacio-vertical left-align no-margin-left'>
            <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista texto-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de Referencia: { valorString }
            </div>
            <br/><br/>
            <LineaCampos>
                <Input 
                    id= { id }
                    name = { id }
                    type= "text"
                    label="Valor"
                    tamano="m6 s6"
                    maxLength="25"
                    requerido = { true }
                    onChange = { handleChange }
                    elError = { elError }
                />
            </LineaCampos>
            <div class="identificacion-registrar"/>
        </div>
    )
}

export {EntradaParametroNum, EntradaParametroBool, EntradaParametroString};
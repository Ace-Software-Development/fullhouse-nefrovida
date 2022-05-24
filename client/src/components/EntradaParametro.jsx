import { useEffect, useState } from 'react';
import Input from './/Input'
import Select from './Select'
import LineaCampos from './LineaCampos';
import LineaParametros from './LineaParametros';

const EntradaParametroNum = ({ id, nombreParametro, valorMin, valorMax, unidad, codigo, handleChange, elError }) => {
    return(
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
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
        />
        </LineaCampos>
        { elError 
            && <div> <div className='red-text left'> <strong> { elError } </strong> </div> <br/><br/> </div>
        }
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
        />
        </LineaCampos>
        { elError 
            && <div> <div className='red-text left'> <strong> { elError } </strong> </div> <br/><br/> </div>
        }
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
        />
        </LineaCampos>
        { elError 
            && <div> <div className='red-text left'> <strong> { elError } </strong> </div> <br/><br/> </div>
        }

        </div>
    )
}

export {EntradaParametroNum, EntradaParametroBool, EntradaParametroString};
import Input from './/Input'
import Select from './Select'

const EntradaParametroNum = ({nombreParametro, unidad, codigo}) => {
    return(
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: 0 - 10 ml
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

const EntradaParametroBool = ({nombreParametro, codigo} ) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: Positivo / Negativo
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

const EntradaParametroString = ({nombreParametro, codigo}) => {
    return (
        <div className='col s10 l6 espacio-vertical left-align'>
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i>
                    <div className="detalles-lista negrita-grande c-64646A left-align">{ nombreParametro + " (" + codigo + "):" }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98">
                Valor de referencia: texto
            </div>
            <br/><br/>
        <Input 
            id="parametroBool"
            type= "text"
            label="Valor"
            tamano="m6 s6"
            requerido = { true }/>
            <br/><br/><br/>
        </div>
    )
}

const EntradaParametro = ({nombreValor=null, nombreParametro="undefined", codigo="?", unidad="undefined", ...rest}) => {
    
    if (nombreValor === "Numérico") {
        return(
            <EntradaParametroNum nombreParametro = {nombreParametro} unidad = {unidad} codigo = {codigo} />
        )
    }
    else if (nombreValor === "Positivo/Negativo") {
        return(
            <EntradaParametroBool nombreParametro = {nombreParametro} codigo = {codigo}/>
            )
        }
    else if (nombreValor === "Texto") {
            return(
            <EntradaParametroString nombreParametro = {nombreParametro} codigo = {codigo}/>
        )
    }
}

export default EntradaParametro;




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
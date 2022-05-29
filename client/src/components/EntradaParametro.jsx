import Input from './/Input'

const EntradaParametro = ({parametro="Sangre:", unidad="ml"}) => {
    return(
        <div className='col s6 l6 espacio-vertical'>
            <div align="left">
                <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">{ parametro }</div><br/>
            </div><br></br>
        <Input 
            id="username"
            type="number" 
            label="Valor"
            tamano="m6 s6"/>
            <br></br>
            <div className="detalles-lista negrita-pequeno c-908F98 left-align">{ unidad }</div>
            </div>
            <br/><br/><br/>
        </div>                             
    )
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
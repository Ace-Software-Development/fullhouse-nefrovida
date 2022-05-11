import Input from './/Input'

const ParametroTipoEstudio = ({parametro="Sangre:", valor="0 - 10", unidad="ml"}) => {
    return(
        <div className='col s6 l6 espacio-vertical'>
            <div align="left">
            <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">{ parametro }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98 left-align">Valor numérico con rango</div>
            <br/><br/><br/>
            <div className="detalles-lista negrita-3vw c-64646A left-align">{valor} { unidad }</div>
            </div>
            <br/><br/><br/>
        </div>                             
    )
}

export default ParametroTipoEstudio;
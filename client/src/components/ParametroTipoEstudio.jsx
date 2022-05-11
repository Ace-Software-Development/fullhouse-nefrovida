import Input from './/Input'

const ParametroTipoEstudio = ({parametro="Sangre:", valorA="0", valorB="10", unidad="ml"}) => {
    return(
        <div className='col s12 l6 espacio-vertical'>
            <div align="left">
            <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-908F98">format_list_numbered</i><div className="detalles-lista negrita-grande c-908F98 left-align">{ parametro }</div><br/>
            </div>
            <br/>
            <div className="detalles-lista light-pequeno c-908F98 left-align">Valor numérico con rango</div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A left-align">{ valorA } - </div>

            <div className="detalles-lista espacio-3vw c-64646A left-align">{ valorB } </div>

            <div className="detalles-lista espacio-3vw c-64646A left-align"> { unidad }</div><br/><br/>
            
            <div className="detalles-lista espacio-pequeno c-64646A left-align">Mínimo Máximo Unidad</div>
            </div>
            <br/><br/><br/>
        </div>                             
    )
}

export default ParametroTipoEstudio;
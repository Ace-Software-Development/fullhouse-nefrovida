const ParametroEstudioPaciente = ({parametro="Sangre:", valor="10", unidad="ml"}) => {
    return(
        <div className='col s12 l6 espacio-vertical'>
            <div align="left">
            <div className='detalles-usuario'>
                    <i className="material-icons icon-separator small c-64646A">format_list_numbered</i><div className="detalles-lista negrita-grande c-64646A left-align">{ parametro }</div><br/>
            </div>
            <br/><br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A left-align">{ valor } { unidad }</div>
            </div>
            <br/><br/><br/>
        </div>                             
    )
}

export default ParametroEstudioPaciente;
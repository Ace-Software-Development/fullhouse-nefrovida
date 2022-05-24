const ParametroEstudioPaciente = ({parametro, valor, unidad, referencia}) => {
    return(
        <div className='col s12 l6 espacio-vertical center-align'>
            
            <br/>

            <div className='detalles-usuario'>
                <i className="material-icons icon-separator small c-64646A">format_list_numbered</i><div className="detalles-lista negrita-grande c-64646A left-align">{ parametro }</div><br/>
            </div>
            <br/><br/>

            <div className="detalles-lista espacio-3vw c-64646A left-align">{ valor } { unidad }</div>

            <br/><br/>

            <div className="detalles-lista espacio-pequeno c-64646A">Referencia: {referencia} {unidad}</div>

            <br/><br/><br/>

            <div className='identificacion-registrar'/>

        </div>                             
    )
}

export default ParametroEstudioPaciente;
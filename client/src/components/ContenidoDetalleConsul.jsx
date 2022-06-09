const ContenidoDetalleConsul = ({  consulta }) => {

    if (consulta === {}){
    return false;
    }
    else{
    return(

        <div align="left">
            <div className="detalles-lista negrita-grande c-64646A left-align">Notas de consulta: </div>
            <div className="detalles-lista light-pequeno c-908F98 left-align">{ consulta.notas }</div>
        </div>
    )
    }
}

export default ContenidoDetalleConsul
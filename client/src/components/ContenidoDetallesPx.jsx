const ContenidoDetallesPx = ({paciente}) => {
    return(
      <div className="contenedor card-"  >
       
            <div className="row">
            <div className="col s6"><i className="material-icons">account_circle</i> {paciente.nombre}  </div>
             <div className="col s6">{paciente.materno}  {paciente.paterno}</div>
      
            </div>
      </div>
        
          




    )
  }
  
  export default ContenidoDetallesPx
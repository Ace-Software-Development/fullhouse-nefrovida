const ContenidoDetalleCol = ({  colaborador, rol }) => {

    if (colaborador === {}){
    return false;
    }
    else{
    return(
    <div className="row ContainerForm left-align">
      <br/>
      <div className="col s7 l6 identificacion-usuario">
          <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> account_circle </i>
          <div className="detalles-lista negrita-grande left-align black-text"> { `${ colaborador.nombre } ${ colaborador.apellidoPaterno } ${ colaborador.apellidoMaterno ? colaborador.apellidoMaterno : ''}` } </div><br/>
          <div className="detalles-lista negrita-pequeno c-908F98 left-align"> { colaborador.username } </div><br/>
      </div>

      <div className="col s5 l6">
      <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98"> person </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { rol } </div>
        </div>
      <br/>
        {
          colaborador.telefono ?
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> phone </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { colaborador.telefono } </div>
          </div>
          : null
        }
      </div>
    </div>
    )
  }
}
  
export default ContenidoDetalleCol
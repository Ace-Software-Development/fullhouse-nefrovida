const ContenidoDetallesPx = ({paciente}) => {
    return(
    <div className="row ContainerForm left-align">
      <br/>
      <div className="col s7 l6 identificacion-usuario">
          <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down">account_circle</i>
          <div className="detalles-lista negrita-grande left-align black-text">Andrea Piña Piñon</div><br/>
          <div className="detalles-lista negrita-pequeno c-908F98 left-align">la_ppap@gmail.com</div><br/>
          <div className="detalles-lista left-align c-908F98 light-pequeno">RAPM001118HGTMNNA6</div>
      </div>
      <div className="col s5 l6">
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98">person</i><div className="detalles-lista left-align c-908F98 light-pequeno">60Kg, 1.65m</div>
        </div>
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98">female</i><div className="detalles-lista left-align c-908F98 light-pequeno">Femenino</div>
        </div>
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98">cake</i><div className="detalles-lista left-align c-908F98 light-pequeno">01/01/1985</div>
        </div>
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98">phone</i><div className="detalles-lista left-align c-908F98 light-pequeno">442 232 8647</div>
        </div>
      </div>
    </div>
    )
  }
  
export default ContenidoDetallesPx
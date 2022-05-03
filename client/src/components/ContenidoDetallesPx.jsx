const ContenidoDetallesPx = ({paciente}) => {
    return(
    <div class="row ContainerForm left-align">
      <br/>
      <div class="col s7 l6 identificacion-usuario">
          <i class="material-icons icon-separator large c_908F98 hide-on-small-and-down">account_circle</i>
          <div class="detalles-lista negrita-grande left-align black-text">Andrea Piña Piñon</div><br/>
          <div class="detalles-lista negrita-pequeno c_908F98 left-align">la_ppap@gmail.com</div><br/>
          <div class="detalles-lista left-align c_908F98 light-pequeno">RAPM001118HGTMNNA6</div>
      </div>
      <div class="col s5 l6">
        <div class="detalles-usuario">
          <i class="material-icons icon-separator small c_908F98">person</i><div class="detalles-lista left-align c_908F98 light-pequeno">60Kg, 1.65m</div>
        </div>
        <br/>
        <div class="detalles-usuario">
          <i class="material-icons icon-separator small c_908F98">female</i><div class="detalles-lista left-align c_908F98 light-pequeno">Femenino</div>
        </div>
        <br/>
        <div class="detalles-usuario">
          <i class="material-icons icon-separator small c_908F98">cake</i><div class="detalles-lista left-align c_908F98 light-pequeno">01/01/1985</div>
        </div>
        <br/>
        <div class="detalles-usuario">
          <i class="material-icons icon-separator small c_908F98">phone</i><div class="detalles-lista left-align c_908F98 light-pequeno">442 232 8647</div>
        </div>
      </div>
    </div>
    )
  }
  
export default ContenidoDetallesPx
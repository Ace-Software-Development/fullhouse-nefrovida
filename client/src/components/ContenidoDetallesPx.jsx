const ContenidoDetallesPx = ({  paciente }) => {
    return(
    <div className="row ContainerForm left-align">
      <br/>
      <div className="col s7 l6 identificacion-usuario">
          <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> account_circle </i>
          <div className="detalles-lista negrita-grande left-align black-text"> { `${ paciente.nombre } ${ paciente.apellidoPaterno } ${ paciente.apellidoMaterno ? paciente.apellidoMaterno : ''}` } </div><br/>
          <div className="detalles-lista negrita-pequeno c-908F98 left-align"> { paciente.correo } </div><br/>
          <div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.curp } </div>
      </div>
      <div className="col s5 l6">
        {
          paciente.peso || paciente.estatura ?
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> person </i>
            <div className="detalles-lista left-align c-908F98 light-pequeno"> 
              { paciente.peso ? `${ paciente.peso } kg  ` : null}  { paciente.estatura ? `${ paciente.estatura } kg  ` : null}
            </div>
          </div>
          : null
        }
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98"> { paciente.sexo === 'masculino' ?  'male' : 'female' } </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.sexo } </div>
        </div>
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98"> cake </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.fechaNacimiento } </div>
        </div>
        <br/>
        {
          paciente.telefono ?
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> phone </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.telefono } </div>
          </div>
          : null
        }
      </div>
    </div>
    )
  }
  
export default ContenidoDetallesPx
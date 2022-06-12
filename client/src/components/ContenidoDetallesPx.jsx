import { ReactSession } from 'react-client-session';
import BtnEditRegis from "./BtnEditRegis";
import BtnRegresar from './BtnRegresar';
import { Link } from 'react-router-dom';
import moment from 'moment'

const ContenidoDetallesPx = ({  paciente }) => {
  
  
  function edadExiste() {
    if (paciente.fechaNacimiento !== undefined){
      const nacimiento = new Date ("" + paciente.fechaNacimiento.substring(6,10) 
                                  + "-" + paciente.fechaNacimiento.substring(3, 5) 
                                  + "-" + paciente.fechaNacimiento.substring(0,2))
        var a = moment(moment.now());
        var b = moment(nacimiento);
        
        var years = a.diff(b, 'year');
        b.add(years, 'years');
        
        var months = a.diff(b, 'months');
        b.add(months, 'months');
        
        //var days = a.diff(b, 'days');
        
        return(years + ' años, ' + months + ' meses ');
    }
  }
  
  return(
  <>
    { ReactSession.get('rol') === "trabajoSocial" &&
      <div className='contenedor'>
        <br/>
        <Link to = "/">
            <BtnRegresar regresarOverride = {true}/>
        </Link>
        <br/><br/><br/>
      </div>
    }
    <div className="row ContainerForm left-align">
      { ( (ReactSession.get('rol') === 'quimico') || 
          (ReactSession.get('rol') === 'doctor') || 
          (ReactSession.get('rol') === 'nutriologo') || 
          (ReactSession.get('rol') ==='psicologo')) &&
          <>
            <br/><br/>
          </>
      }
      <div className="col s7 l6 identificacion-usuario">
          <i className="material-icons icon-separator large c-908F98 hide-on-small-and-down"> account_circle </i>
          <div className="detalles-lista negrita-grande left-align black-text"> { `${ paciente.nombre } ${ paciente.apellidoPaterno } ${ paciente.apellidoMaterno ? paciente.apellidoMaterno : ''}` } </div><br/>
          {paciente.email ? <><div className="detalles-lista negrita-pequeno c-908F98 left-align"> { paciente.email } </div><br/></> : null}
          <div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.curp } </div>
      </div>
      <div className="col s5 l6">
        {
          paciente.peso || paciente.estatura ?
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> person </i>
            <div className="detalles-lista left-align c-908F98 light-pequeno"> 
              { paciente.peso ? `${ paciente.peso } kg` : null}  { paciente.estatura ? `, ${ paciente.estatura } cm  ` : null}
            </div>
          </div>
          : null
        }
        <br/>
        <div className="detalles-usuario">
          <i className="material-icons icon-separator small c-908F98"> { paciente.sexo === 'masculino' ?  'male' : 'female' } </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.sexo === 'masculino' ?  'Masculino' : 'Femenino' } </div>
        </div>
        <br/>
        { paciente.fechaNacimiento ?
        (
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> cake </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.fechaNacimiento }, {edadExiste()} </div>
          </div>
        ) : null}
        <br/>
        {
          paciente.telefono ?
          <div className="detalles-usuario">
            <i className="material-icons icon-separator small c-908F98"> phone </i><div className="detalles-lista left-align c-908F98 light-pequeno"> { paciente.telefono } </div>
          </div>
          : null
        }
      </div>
      <div className='contenedor'>
        <br/>
        { ReactSession.get('rol') === 'trabajoSocial' &&
          <>
            <br/>
            <Link to = {"/paciente/editar/" + paciente.curp}>
              <BtnEditRegis icono = "edit" texto = "Editar paciente" posicion = "right" />
            </Link>
          </>
        }
      </div>
    </div>
  </>
  )
}
  
export default ContenidoDetallesPx
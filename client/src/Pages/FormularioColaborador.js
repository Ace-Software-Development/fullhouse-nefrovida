const FormularioColaborador = ({}) => {
  
    const [nombre, setNombre] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [sexo, setSexo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassowrd] = useState('');
  
    const handleSubmit = (e) => { 
      e.preventDefault();
      const data = {nombre, paterno, materno, nacimiento, sexo, telefono, rol, correo, password};
      console.log(data);
    }
    
    return (
    <div className="card">
      <div className="card-vacia">
        <div className="card-titulo">
          <i className="material-icons sidenav-button icon-separator">person_add</i>Registrar empleado
        </div>
        <div className="contenedor card-formulario">
          <a className="waves-effect waves-dark btn btn-regresar white amber lighten-3 grey-text text-darken-4 left">Regresar<i className="material-icons left">arrow_back</i></a>
          <br></br><br></br>
          <div className="row">
            <form onSubmit={handleSubmit} className="col s12">
              <div className="row row-figma">
                <div className="input-field col s12 m4">
                  <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="validate z-depth-1"></input>
                  <label for="nombre">Nombre</label>
                </div>
                <div className="input-field col s12 m4">
                  <input id="paterno" type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} className="validate z-depth-1"></input>
                  <label for="paterno">Apellido Paterno</label>
                </div>
                <div className="input-field col s12 m4">
                  <input id="materno" type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} className="validate z-depth-1"></input>
                  <label for="materno">Apellido Materno</label>
                </div>
              </div>
              <div className="row row-figma">
                <div className="input-field col s8 m4">
                  <input id="nacimiento" type="text" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} className="datepicker z-depth-1"></input>
                  <label for="nacimiento">Fecha de nacimiento</label>
                </div>
                <div className="input-field col s4 m2">
                  <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="" disabled selected></option>
                    <option value="1">Hombre</option>
                    <option value="2">Mujer</option>
                  </select>
                  <label>Sexo</label>
                </div>
                <div className="input-field col s8 m4">
                  <input id="telefono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="validate z-depth-1"></input>
                  <label for="telefono">Teléfono</label>
                </div>
                <div className="input-field col s4 m2">
                  <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="" disabled selected></option>
                    <option value="1">Trabajador social</option>
                    <option value="2">Químico</option>
                    <option value="3">Doctor</option>
                    <option value="4">Nutriólogo</option>
                    <option value="5">Psicólogo</option>
                  </select>
                  <label>Rol</label>
                </div>
              </div>
              <div className="row row-figma">
                <div className="input-field col s8">
                  <input id="email" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="validate z-depth-1"></input>
                  <label for="email">Correo electrónico:</label>
                </div>
                <div className="input-field col s4">
                  <input id="password" type="password" value={password} onChange={(e) => setPassowrd(e.target.value)} className="validate z-depth-1"></input>
                  <label for="password">Contraseña</label>
                </div>
              </div>
            </form>
          </div>
          <button className="waves-effect waves-dark btn btn-guardar green darken-1 white-text text-accent-4 right">Guardar<i className="material-icons left">save</i></button>
        </div>
      </div>
    </div>
    )
}

export default FormularioColaborador
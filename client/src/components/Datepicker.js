const Datepicker = ({tamano = "s12 m4", id = "nombre", label = "Nombre", tipo="text"}) => {
    return(
      <div className={"input-field col " + tamano}>
        <input id={id} type={tipo} name={id} className="datepicker z-depth-1"/>
        <label for={id}>{label}</label>
      </div>
    )
  }
  
  export default Datepicker
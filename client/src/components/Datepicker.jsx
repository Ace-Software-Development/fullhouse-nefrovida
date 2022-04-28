const Datepicker = ({tamano = "s12 m4", id = "nombre", label = "Nombre", ...rest}) => {
  return(
    <div className={"input-field col " + tamano}>
      <input
        name={id}
        id={id} 
        type="date"
        className="validate z-depth-1" 
        {...rest}/>
      <label for={id}>{label}</label>
    </div>
  )
}
  
export default Datepicker
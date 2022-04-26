const Input = ({tamano = "s12 m4", id = "nombre", label = "Nombre", tipo="text", handleInputChange}) => {
  return(
    <div className={"input-field col " + tamano}>
      <input id={id} type={tipo} name={id} className="validate z-depth-1" onChange={handleInputChange}/>
      <label for={id}>{label}</label>
    </div>
  )
}

export default Input
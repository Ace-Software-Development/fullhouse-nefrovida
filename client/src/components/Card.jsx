// Crea la card sin nada dentro, lista para meter contenido.
const Card = ({children}) => {
  return(
    <div className="card"  >
      <div className="card-vacia"  >
          {children}
      </div>
    </div>
  )
}

export default Card

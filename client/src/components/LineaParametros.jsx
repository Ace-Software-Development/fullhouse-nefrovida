// Hace que el contenido de los forms sea adaptable en distintas resoluciones.
const LineaParametros = ({children}) => {
  return(
    <div className="row row-parametros"  >
      {children}
    </div>
  )
}
  
export default LineaParametros
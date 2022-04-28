// Hace que el contenido de los forms sea adaptable en distintas resoluciones.
const LineaCampos = ({children}) => {
  return(
    <div className="row row-figma"  >
      {children}
    </div>
  )
}

export default LineaCampos
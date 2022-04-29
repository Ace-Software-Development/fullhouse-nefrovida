const CardTitulo = ({icono = "help", titulo }) => {
  return (
    <div className="card-titulo"  >
      <i 
        className="material-icons sidenav-button icon-separator"  >{icono}</i>
      {titulo}
    </div>
  )
}

export default CardTitulo
const CardSubtitulo = ({ subtitulo, grande = false, children}) => {
  return (
    <div>
      { grande
        ? (
        <div className="card-subtitulo-grande"  >
          { children 
            ? <> <div className="texto-subtitulo-grande"> { subtitulo }</div> <div className="flex-for-main-div"> { children } </div> </>  
            : <div> { subtitulo } </div> }
        </div>
        ) 
        : (
          <div className="card-subtitulo"  >
          { children 
            ? <div> { subtitulo } { children } </div> 
            : <div> { subtitulo } </div> }
        </div>
        ) }
    </div>
  )
}

export default CardSubtitulo
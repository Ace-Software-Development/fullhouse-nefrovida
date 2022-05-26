const CardSubtitulo = ({ subtitulo, children}) => {
  return (
    <div className="card-subtitulo"  >
      { children 
        ? <div> { subtitulo } { children } </div> 
        : <div> { subtitulo } </div> }
    </div>
  )
}

export default CardSubtitulo
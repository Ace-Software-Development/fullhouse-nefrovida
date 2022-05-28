// Hace que el contenido de las minicards sea ajustable de forma dinámica
const LineaCardsEstudios = ({children}) => {
    return(
        <div className="row row-cards-estudios"  >
            {children}
        </div>
    )
}

export default LineaCardsEstudios
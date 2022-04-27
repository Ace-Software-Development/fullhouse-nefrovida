// Evita el overflow del formulario fuera de la card. Acomoda elementos.

const ContainerForm = ({children}) => {
    return(
        <div className="contenedor card-formulario">
            {children}
        </div>
    )
}

export default ContainerForm
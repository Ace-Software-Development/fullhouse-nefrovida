const CardEstudio = ({ idTipoEstudio = "undefined", idPaciente = "undefined" }) => {
    return (
        <>
            <div className="col s6 l4 xl3 card-mini-separation no-margin-left">
                <div className="card card-mini">
                <br/>
                <div className="card-mini-flex">
                    <i className="material-icons icon-separator">biotech</i><span className="card-mini-text">Tipo de Estudio</span>
                </div>
                <br/>
                <div className="card-mini-flex">
                    <a href={"/consultarTipoEstudio" + "/"+idTipoEstudio}>
                        <i className="material-icons estudio-button icon-separator c-2E7EC8">description</i>
                    </a>
                    <a href={"/registrarEstudio" + "/" +idPaciente + "/"+idTipoEstudio}>
                        <i className="material-icons estudio-button icon-separator c-98D0A1">add</i>
                    </a>
                </div>
                <br/>
                </div>
            </div>
        </>
    )
}

export default CardEstudio
import { ReactSession } from 'react-client-session';
const CardConsulta = ({ nombre="undefined" }) => {
    return (
        <>
            <div className="col s6 m4 l4 xl3 card-mini-separation no-margin-left">
                <div className="card card-mini">
                <br/>
                <div className="card-mini-flex center">
                    <i className="material-icons icon-separator">create</i><span className="card-mini-text">{ nombre }</span>
                </div>
                <br/>
                <div className="card-mini-flex">
                    
                    { (ReactSession.get('rol') === 'doctor' || ReactSession.get('rol') === 'nutriologo' || ReactSession.get('rol') === 'psicologo') &&
                        <a href={ '' }>
                        <i className="material-icons estudio-button icon-separator c-2E7EC8">description</i>
                        </a>
                        
                    }
                </div>
                <br/>
                </div>
            </div>
        </>
    )
}

export default CardConsulta
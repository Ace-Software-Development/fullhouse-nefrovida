import FilaTablaColaborador from './FilaTablaColaborador';
const TablaColaboradores = ({ datos }) => {

const tableContent = datos.map((colaborador, index) => (
    <FilaTablaColaborador key = { index } colaborador = { colaborador } />
    ));

return(
    <div>
    <div className="card contenedor tabla-altura">
        <table id="doctores" className="highlight">     
        <thead  >
            <tr className="figma"  >
                
                <th className="tabla-padding">
                    Nombre
                </th>
                
                <th>
                    Correo
                </th>

                <th>
                    Teléfono
                </th>
                <th className="center">
                    Detalles
                </th>
            </tr>
        </thead>
        { tableContent }
        </table>
    </div>  
    <br/>
    <br/>
    </div>
    )
    }

export default TablaColaboradores
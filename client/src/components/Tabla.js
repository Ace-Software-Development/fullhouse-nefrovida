// Datos de ejemplo
const column = [
    "Nombre",
    "Rol",
    "Teléfono",
    "Detalle"
]

const arr = ["Eduardo Pete Gil", "Hombre", "Dueño de pepe", "4641063915", "http://store.steampowered.com/",
             "Andrea Pineapple", "Mujer",  "La PPAP, chii", "4425672356", "http://www.google.com/",
             "Coraline Herrera", "Mujer",  "La acabadota ", "0553455663", "http://www.youtube.com/",
             "David GuzLolero ", "Lolero", "El lolero lol", "5674447535", "http://lan.leagueoflegends.com/",
             "Felipe Pollos RLP","Pistola","El Felipollos", "5674567746", "http://www.furaffiny.net/",
             "Manolo furry pto","Furrencio","El pinche furro","4641238080","http://e621.net/"
            ]

const columnlen = column.length;

const Tabla = (arr) => {
    return(
        <>
            <div className="card contenedor tabla-altura">
                <table id="doctores" className="highlight">
                    
                    <thead>
                        <tr className="figma">
                            <th class="tabla-padding">Columna 1</th>
                            <th>Columna 2</th>
                            <th>Columna 3</th>
                            <th className="center">Columna 4</th>
                        </tr>
                    </thead>

                    <tr>
                        <td className="tabla-padding"><a href={arr[0+4]}>{arr[0]}</a><br/><g className="tabla-sexo">{arr[0+1]}</g></td>
                        <td><a href={arr[0+4]}>{arr[0+2]}</a></td>
                        <td><a href={arr[0+4]}>{arr[0+3]}</a></td>
                        <td className="center"><a href={arr[0+4]}><i class="material-icons">insert_drive_file</i></a></td>
                    </tr>

                </table>
            </div>  
            <br/><br/>
        </>
    )
}

export default Tabla

// Guía de diseño

// En el <thead>, donde está el tr,
// el primer th debe tener la clase "tabla-paddinng",
// el segundo th y los que siguen sólo el dato,
// el último th debe tener la clase "center".

// Para los datos como tal,
// se debe generar un tr por cada renglón de datos
// el primer td tendrá la clase "tabla-padding", un <br> sin clase y un <g> con clase "tabla-sexo"
// el segundo td y los que siguen sólo los datos,
// el último td debe contener la clase "center" con un ícono fijo "insert_drive_file"
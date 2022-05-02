// Datos de ejemplo
import ContenidoTablaPx from "./ContenidoTablaPx";
const arr = [{nombre: "Eduardo"}, {materno: "Pete"}, {paterno: "Gil"}, {sexo:"Hombre"}, {rol: "Dueño de pepe"}, {telefono:"4641063915"}, {detalle:"http://store.steampowered.com/"},
             {nombre: "Andrea"}, {materno: "Pineapple"}, {paterno: "Pen"}, {sexo:"Mujer"}, {rol: "La PPAP"}, {telefono: "4425672356"}, {detalle:"http://www.youtube.com/"},
             {nombre: "David"}, {materno: "Guz"}, {paterno: "Lolero"}, {sexo:"Hombre"}, {rol: "El Lolero"}, {telefono:"5674447535"}, {detalle:"http://lan.leagueoflegends.com/"},
             {nombre: "Feli"}, {materno: "Pollos"}, {paterno: "Feliz"}, {sexo: "Hombre"}, {rol: "El Felipollos"}, {telefono: "9311901105"}, {detalle:"https://pollofelizslp.com/"}
            ]

const Tabla = (datos) => {
  
  

  const tableContent = datos.datos.map((paciente)=>(
  <ContenidoTablaPx paciente= {paciente} />
    

  )




  )

  return(
    <>
      <div className="card contenedor tabla-altura"  >
        <table id="doctores" className="highlight"  >
            
          <thead  >
            <tr className="figma"  >
                <th class="tabla-padding"  >
                  Nombre
                </th>
                <th  >
                  Correo
                </th>
                <th  >
                  Teléfono
                </th>
                <th className="center"  >
                  Detalle
                </th>
            </tr>
          </thead>

        
          {tableContent}
        </table>
      </div>  
      <br  />
      <br  />
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
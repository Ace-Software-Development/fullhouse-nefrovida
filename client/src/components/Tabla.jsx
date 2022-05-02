// Datos de ejemplo
const arr = [{nombre: "Eduardo"}, {materno: "Pete"}, {paterno: "Gil"}, {sexo:"Hombre"}, {rol: "Dueño de pepe"}, {telefono:"4641063915"}, {detalle:"http://store.steampowered.com/"},
             {nombre: "Andrea"}, {materno: "Pineapple"}, {paterno: "Pen"}, {sexo:"Mujer"}, {rol: "La PPAP"}, {telefono: "4425672356"}, {detalle:"http://www.youtube.com/"},
             {nombre: "David"}, {materno: "Guz"}, {paterno: "Lolero"}, {sexo:"Hombre"}, {rol: "El Lolero"}, {telefono:"5674447535"}, {detalle:"http://lan.leagueoflegends.com/"},
             {nombre: "Feli"}, {materno: "Pollos"}, {paterno: "Feliz"}, {sexo: "Hombre"}, {rol: "El Felipollos"}, {telefono: "9311901105"}, {detalle:"https://pollofelizslp.com/"}
            ]

const Tabla = (datos) => {
  const titulos = Object.keys(datos.datos[0]);
  

  const tableContent = datos.datos.map((paciente)=>(

    <tr  >
    <td className="tabla-padding"  >
      <a href="http://www.google.com"  >
        {paciente.nombre} {paciente.materno} {paciente.paterno}
      </a>
      <br/>
      <g className="tabla-sexo"  >
       {paciente.sexo}
      </g>
    </td>
    <td  >
      <a href="http://www.google.com"  >
       { paciente.correo}
      </a>
    </td>
    <td  >
      <a href="http://www.google.com"  >
       { paciente.telefono}
      </a>
    </td>
    <td className="center"  >
      <a href="http://www.google.com"  >
        <i class="material-icons"  >
          insert_drive_file
        </i>
      </a>
    </td>
  </tr>

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
                  Detalles
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
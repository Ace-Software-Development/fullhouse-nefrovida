import React from 'react';
import "./css/materialize-mod.css";
import "./css/components.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrarEstudio from './pages/RegistrarEstudio';
import Home from './pages/Home';
import ConsultarEstudioPaciente from './pages/ConsultarEstudioPaciente';
import EstudiosLaboratorio from './pages/EstudiosLaboratorio';
import { ReactSession } from 'react-client-session';
import ErrorBoundary from './components/ErrorBoundary'
import PrivateRoute from './components/PrivateRoute';
import NoAuthRoute from './components/NoAuthRoute';
import IniciarSesion from './pages/IniciarSesion';
import NotFound from './pages/error/404notFound'
import Forbidden from './pages/error/403Forbidden';
import RegistrarPaciente from './pages/RegistrarPaciente'
import DetallePaciente from './pages/DetallePaciente'
import ConsultarTipoEstudio from './pages/ConsultarTipoEstudio';
import DetalleResumenConsulta from './pages/DetalleResumenConsulta';
import RegistrarResumenConsulta from './pages/RegistrarResumenConsulta';
import DetalleColaborador from './pages/DetalleColaborador';
import ConsultarColaborador from './pages/ConsultarColaborador';
import RegistrarColaborador from './pages/RegistrarColaborador';
import GenerarEstudioPDF from './pages/GenerarEstudioPDF';
import RegistrarTipoEstudio from './pages/RegistrarTipoEstudio';
import TiposEstudio from './pages/TiposEstudio';
import EditarPaciente from './pages/EditarPaciente';
import ConsultarResumenConsulta from './pages/ConsultarResumenConsulta';
import RegistrarNuevoParametro from './pages/RegistrarNuevoParametro';


function App() {
  // Definir que session se almacenará en una cookie
  ReactSession.setStoreType("cookie");

  /**
   * Definir rutas de aplicación con protección
   * dependiendo de la sessión del usuario.
   */
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>

          <Route exact path='/iniciarSesion' element={<NoAuthRoute/>}>
            <Route exact path='/iniciarSesion' element={<IniciarSesion />}/>
          </Route>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>

          <Route exact path='/registrarEstudio/:curp/:idTipoEstudio/' element={<PrivateRoute/>}>
            <Route exact path='/registrarEstudio/:curp/:idTipoEstudio/' element={<RegistrarEstudio/>} />
          </Route>

          <Route exact path='/estudio/:idEstudio' element={<PrivateRoute/>}>
            <Route exact path='/estudio/:idEstudio' element={<ConsultarEstudioPaciente/>} />
          </Route>
          
          <Route exact path='/paciente/:curp/estudio/:idEstudio' element={<PrivateRoute/>}>
            <Route exact path='/paciente/:curp/estudio/:idEstudio' element={<ConsultarEstudioPaciente/>} />
          </Route>

          <Route exact path='/estudio/PDF/:idEstudio' element={<PrivateRoute/>}>
            <Route exact path='/estudio/PDF/:idEstudio/:idPaciente' element={<GenerarEstudioPDF/>} />
          </Route>

          <Route exact path='/paciente/:idPaciente/estudios' element={<PrivateRoute/>}>
            <Route exact path='/paciente/:idPaciente/estudios' element={<EstudiosLaboratorio/>} />
          </Route>

          <Route exact path='/paciente' element={<PrivateRoute/>}>
            <Route exact path='/paciente' element={<RegistrarPaciente />} />
          </Route>

          <Route exact path='/paciente/editar/:curp' element={<PrivateRoute/>}>  
            <Route exact path='/paciente/editar/:curp' element={<EditarPaciente />} />
          </Route>

          <Route exact path='/paciente/:curp' element={<PrivateRoute/>}>
            <Route exact path= '/paciente/:curp' element={<DetallePaciente/>}/>
          </Route>

          <Route exact path='/consultarTipoEstudio/:idTipoEstudio' element={<PrivateRoute/>}>
            <Route exact path='/consultarTipoEstudio/:idTipoEstudio' element={<ConsultarTipoEstudio />} />
          </Route>

          <Route exact path='/consulta/:curp/resumen/:idResumen' element={<PrivateRoute />}>
            <Route exact path='/consulta/:curp/resumen/:idResumen' element={<DetalleResumenConsulta />} />
          </Route>
          
          <Route exact path='/registrarParametro' element={<PrivateRoute />} >
            <Route exact path='/registrarParametro' element={<RegistrarNuevoParametro />} />
          </Route>

          <Route exact path='/registrarConsulta/:curp' element={<PrivateRoute/>}>
            <Route exact path='/registrarConsulta/:curp' element={<RegistrarResumenConsulta />} />
          </Route>

          <Route exact path='/registrarConsulta/:idPaciente/consultas' element={<PrivateRoute/>}>
            <Route exact path='/registrarConsulta/:idPaciente/consultas' element={<ConsultarResumenConsulta />} />
          </Route>

          <Route exact path='/colaborador' element={<PrivateRoute/>}>
            <Route exact path='/colaborador' element={<ConsultarColaborador/>}/>
          </Route>

          <Route exact path='/registrarColaborador' element={<PrivateRoute/>}>
            <Route exact path='/registrarColaborador' element={<RegistrarColaborador/>}/>
          </Route>

          <Route exact path='/registrarTipoEstudio' element={<PrivateRoute/>}>
            <Route exact path='/registrarTipoEstudio' element={<RegistrarTipoEstudio/>}/>
          </Route>

          <Route exact path='/colaborador/:username/:rol' element={<PrivateRoute/>}>
            <Route exact path= '/colaborador/:username/:rol' element={<DetalleColaborador/>}/>
          </Route>

          <Route exact path='/403' element={<PrivateRoute/>}>
            <Route exact path='/403' element={<Forbidden />} />
          </Route>

          <Route exact path='*' element={<PrivateRoute/>}>
            <Route exact path='*' element={<NotFound />} />
          </Route>

        </Routes>
      </ErrorBoundary>
    </BrowserRouter>

  )
}

export default App;
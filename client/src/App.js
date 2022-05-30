import React from 'react';
import "./css/materialize-mod.css";
import "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrarEstudio from './pages/RegistrarEstudio';
import { ReactSession } from 'react-client-session';
import ErrorBoundary from './components/ErrorBoundary'
import PrivateRoute from './components/PrivateRoute';
import NoAuthRoute from './components/NoAuthRoute';
import IniciarSesion from './pages/IniciarSesion';
import NotFound from './pages/error/404notFound'
import Forbidden from './pages/error/403Forbidden';
import Home from './pages/Home'
import RegistrarPaciente from './pages/RegistrarPaciente'
import ConsultarTipoEstudio from './pages/ConsultarTipoEstudio';
import Temp from './pages/Temp';


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

          <Route exact path='/registrarEstudio' element={<PrivateRoute/>}>
            <Route exact path='/registrarEstudio' element={<RegistrarEstudio curp="PICA010404MQTXVNA5" idTipoEstudio="HifRCCITUo"/>} />
          </Route>
          <Route exact path='/paciente' element={<PrivateRoute/>}>
            <Route exact path='/paciente' element={<RegistrarPaciente />} />
          </Route>

          <Route exact path='/consultarTipoEstudio/:idTipoEstudio' element={<PrivateRoute/>}>  
            <Route exact path='/consultarTipoEstudio/:idTipoEstudio' element={<ConsultarTipoEstudio />} />
          </Route>

          <Route exact path='/temp' element={<PrivateRoute/>}>  
            <Route exact path='/temp' element={<Temp />} />
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
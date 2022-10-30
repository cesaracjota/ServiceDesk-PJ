import React from 'react';
import { Switch } from 'react-router-dom';

import { home } from './home/home';
import { HomeUsuarioComun } from './home/UsuarioComun/index';
import { HomeSoporteTecnico } from './home/SoporteTecnico/index';
import { Configuracion, MisIncidencias } from './incidencia/asistente/incidencia';
import { Incidencia } from './incidencia/incidencia';
import { IncidenciaUsuario } from './incidencia/usuario/incidencia';
import { IncidenciaAsistenteNoAsignados, IncidenciaAsistenteAsignados } from './incidencia/asistente/incidencia';
import { PerfilPersona } from './perfilpersona/perfilPersona';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { useSelector } from 'react-redux';
import { Sede } from './sede/sede';
import { Organo } from './organo/organo';
import { Oficina } from './oficina/oficina';
import { Persona } from './persona/persona';
import { Cargo } from './cargo/cargo';
import { Correo } from './correo/index';
import { Motivo } from './motivoIncidencia/motivo';
import { IncidenciaSoporte } from './incidencia/soporte/incidencia';
import { OrigenIncidencia } from './origenIncidencia/origen';
import { Reportes } from './home/reportes/reportes';
import { ReporteIncidencia, IncidenciaSegundoReporte, IncidenciaTercerReporte } from './home/reportes/incidencia/index'
import { perfil } from './perfil/index';
import { Ftp } from './ftp/ftp';
import { IncidenciaConocimiento } from './incidencia/conocimiento/incidencia';
import { CorreoCredencial } from './correoCredencial/correoCredencial';
import { Mensaje } from './mensaje/mensaje';

export const DasboardScreen = () => {
  //
  const { access_token } = useSelector(state => state.auth);
  return (
    <>
      <Switch>
        <PrivateRoute
          exact path="/dashboard/home"
          component={home}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/soporte-tecnico/home"
          component={HomeSoporteTecnico}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/usuario/home"
          component={HomeUsuarioComun}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/motivos"
          component={Motivo}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/incidencias"
          component={Incidencia}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/mis-incidencias"
          component={MisIncidencias}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/usuario/incidencias"
          component={IncidenciaUsuario}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/incidencias-asignadas"
          component={IncidenciaAsistenteAsignados}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/incidencias-no-asignadas"
          component={IncidenciaAsistenteNoAsignados}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/soporte/incidencias"
          component={IncidenciaSoporte}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/perfil"
          component={PerfilPersona}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/sedes"
          component={Sede}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/organos"
          component={Organo}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/oficinas"
          component={Oficina}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/personas"
          component={Persona}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/cargos"
          component={Cargo}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/correos"
          component={Correo}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/origen-incidencia"
          component={OrigenIncidencia}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/reportes"
          component={Reportes}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/reportes/incidencias-por-tecnico"
          component={ReporteIncidencia}
          isAuthenticated={!!access_token}
        />
         <PrivateRoute
          exact path="/dashboard/reportes/incidencias-por-usuario"
          component={IncidenciaSegundoReporte}
          isAuthenticated={!!access_token}
        />
         <PrivateRoute
          exact path="/dashboard/reportes/incidencias-por-tiempos"
          component={IncidenciaTercerReporte}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/mi-perfil"
          component={perfil}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/ftp"
          component={Ftp}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/tabla-conocimiento"
          component={IncidenciaConocimiento}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/correo-credencial"
          component={CorreoCredencial}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/configuraciones"
          component={Configuracion}
          isAuthenticated={!!access_token}
        />
        <PrivateRoute
          exact path="/dashboard/mensajes"
          component={Mensaje}
          isAuthenticated={!!access_token}
        />
      </Switch>
    </>
  );
};

import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { RegisterValidateScreen } from '../components/auth/RegisterValidateScreen';
import { DasboardScreen } from '../components/ui/DasboardScreen';
import HistorialUsuario from '../components/historialUsuario/HistorialUsuario';

import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.auth);
  const { rol } = useSelector(state => state.auth);

  useSelector(state => state);

  useEffect(() => {
    if (!access_token) {
      dispatch(startChecking());
    }
  }, [dispatch, access_token]);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/auth/login"
            component={LoginScreen}
            isAuthenticated={!!access_token}
            rol={rol}
          />
          <PublicRoute
            exact
            path="/auth/register"
            component={RegisterScreen}
            isAuthenticated={!!access_token}
            rol={rol}
          />
          <PublicRoute
            exact
            path="/auth/register/validate"
            component={RegisterValidateScreen}
            isAuthenticated={!!access_token}
            rol={rol}
          />
          <PrivateRoute
            exact
            path="/dashboard/soporte-tecnico/home"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/usuario/home"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/home"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/usuario"
            component={HistorialUsuario}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/perfil"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/sedes"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/organos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/oficinas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/personas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/cargos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/mis-incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/usuario/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/incidencias-asignadas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/incidencias-no-asignadas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/soporte/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/motivos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/correos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/origen-incidencia"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/reportes/**"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/reportes/incidencias-por-tecnico"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/reportes/incidencias-por-usuario"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/reportes/incidencias-por-tiempos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/mi-perfil"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/ftp"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/tabla-conocimiento"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/correo-credencial"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          {
              rol === '[COORDINADOR INFORMATICO]' || rol === '[ASISTENTE INFORMATICO]'
              ?
              <Redirect exact to="/dashboard/home" />
              :
              rol === '[SOPORTE TECNICO]'
              ? 
              <Redirect exact to="/dashboard/soporte-tecnico/home" />
              : 
              rol === '[USUARIO COMUN]'
              ? 
              <Redirect exact to="/dashboard/usuario/home" />
              : 
              <Redirect exact to="/dashboard/usuario/home" />
          }
        </Switch>
      </div>
    </Router>
  );
};

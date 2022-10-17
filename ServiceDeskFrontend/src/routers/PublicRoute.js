import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  rol,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
              rol === '[COORDINADOR INFORMATICO]' || rol === '[ASISTENTE INFORMATICO]'
              ?
              <Redirect exact to="/dashboard/home" />
              : rol === '[SOPORTE TECNICO]'
              ? <Redirect exact to="/dashboard/soporte-tecnico/home" />
              : rol === '[USUARIO COMUN]'
              ? <Redirect exact to="/usuario" from="/dashboard/usuario/home" />
              : <Redirect exact to="/usuario" from="/dashboard/usuario/home" />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({    
    isAuthenticated,
    exact,
    component: Component,
    ...rest
}) => {

    return (
        <Route
            { ...rest }
            component={  ( props ) => (
                ( isAuthenticated )
                    ? (<Component { ...props } />)
                    : (<Redirect exact to="/auth/login"/>)
            )}
        />
    )
}


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
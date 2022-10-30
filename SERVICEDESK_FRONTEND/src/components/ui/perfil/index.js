import React from 'react';
import { store } from '../../../store/store';
import UserProfile from './PerfilUsuario';
import Profile from './Perfil';
import Dashboard from '../base/layout/Dashboard';

export const perfil = () => {

    const usuario = store.getState().auth;

    return (<Dashboard componente={usuario?.rol !== '[USUARIO COMUN]' ? <Profile/> : <UserProfile/> } />)

};
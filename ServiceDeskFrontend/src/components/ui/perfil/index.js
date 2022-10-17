import React from 'react';
import Sidebar from '../base/Sidebar';
import { store } from '../../../store/store';
import UserProfile from './PerfilUsuario';
import Profile from './Perfil';

export const perfil = () => {

    const usuario = store.getState().auth;

    return (
        <>
        <Sidebar
            componente={usuario.rol !== '[USUARIO COMUN]' ? Profile : UserProfile }/>
        </>
    );
};
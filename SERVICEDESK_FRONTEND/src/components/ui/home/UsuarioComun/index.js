import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMensajes } from '../../../../actions/mensaje';
import { store } from '../../../../store/store';
import Dashboard from '../../base/layout/Dashboard';
import { getMensajes } from '../../mensaje/mensaje';
import Inicio from './HomeUsuario';

export const HomeUsuarioComun = () => {

  const dispatch = useDispatch();

  const fetchDataMensajes = async () => {
    const response = await fetchMensajes();
    dispatch(getMensajes(response));
  }

  useEffect(() => {
    if (store.getState().mensaje.checking) {
      fetchDataMensajes();
    }
  });

  return (<Dashboard componente={<Inicio/>} />);

};
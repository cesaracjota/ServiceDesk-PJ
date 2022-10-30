import { useEffect } from 'react';
import React from 'react';
import { fetchMensajes } from '../../../../actions/mensaje';
import { store } from '../../../../store/store';
import { useDispatch } from 'react-redux';
import HomeSoporte from './HomeSoporteTecnico';
import Dashboard from '../../base/layout/Dashboard';
import { types } from '../../../../types/types';

export const HomeSoporteTecnico = () => {

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

  return (<Dashboard componente={<HomeSoporte/>} />);

};

export const getMensajes = mensaje => ({
  type: types.eventLoadedMensajes,
  payload: mensaje
})
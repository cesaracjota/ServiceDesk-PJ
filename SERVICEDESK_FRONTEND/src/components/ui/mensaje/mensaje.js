import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchMensajes } from '../../../actions/mensaje';
import TableMensajes from './TableMensajes';
import { store } from '../../../store/store';
import { types } from '../../../types/types';
import Dashboard from '../base/layout/Dashboard';

export const Mensaje = () => {

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

  return (<Dashboard componente={<TableMensajes />} />)

}

export const getMensajes = mensaje => ({
  type: types.eventLoadedMensajes,
  payload: mensaje
})
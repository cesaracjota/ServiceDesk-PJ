import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchOrigen } from '../../../actions/origenIncidencia';
import { types } from '../../../types/types';
import TableOrigen from './TableOrigenIncidencia';
import Dashboard from '../base/layout/Dashboard';

export const OrigenIncidencia = () => {

  const dispatch = useDispatch();

  const fetchDataOrigen = async () => {
    const response = await fetchOrigen();
    dispatch(getOrigen(response));
  }

  useEffect(() => {    
    if(store.getState().origenIncidencia.checking){
      fetchDataOrigen();
    }
  });

  return (<Dashboard componente={<TableOrigen />} />)

};

export const getOrigen = origen =>({
  type: types.eventLoadedOrigenIncidencia,
  payload: origen
});

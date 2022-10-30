import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import { fetchIncidenciasPersonas } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableIncidencia from './TableIncidencia';
import { fetchMotivos } from '../../../../actions/motivo';
import { fetchOrigen } from '../../../../actions/origenIncidencia';
import Dashboard from '../../base/layout/Dashboard';

export const IncidenciaUsuario = () => {
  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataMisIncidencias = async () => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaId(response));    
  }

  // fetch Motivos
  const fetchDataMotivos = async () => {
    const response = await fetchMotivos();
    dispatch(getMotivos(response));    
  }

  // fetch Origenes
  const fetchDataOrigenes = async () => {
    const response = await fetchOrigen();
    dispatch(getOrigenes(response));
  }

  useEffect(() => {
    if(store.getState().incidenciaId.checking){
      fetchDataMisIncidencias();
      fetchDataMotivos();
      fetchDataOrigenes();
    }
  });

  return (<Dashboard componente={<TableIncidencia />} />);

};

export const getIncidenciaId = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});

export const getMotivos = motivo =>({
  type: types.eventLoadedMotivo,
  payload: motivo
});

export const getOrigenes = origen =>({
  type: types.eventLoadedOrigenIncidencia,
  payload: origen
});

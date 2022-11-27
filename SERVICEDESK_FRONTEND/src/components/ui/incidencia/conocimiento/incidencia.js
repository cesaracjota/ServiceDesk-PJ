import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import { fetchIncidencias, fetchIncidenciasPersonas } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableConocimiento from './TableConocimiento';
import Dashboard from '../../base/layout/Dashboard';
import { fetchSedes } from '../../../../actions/sede';
import { getSede } from '../../sede/sede';

export const IncidenciaConocimiento = () => {
  
  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataIncidencias = async () => {
    const response = await fetchIncidencias();
    dispatch(getIncidencias(response));
  }

  const fetchDataMisIncidencias = async () => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaId(response));    
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if(store.getState().incidencia.checking){
      fetchDataIncidencias();
    }
    if(store.getState().incidenciaId.checking){
      fetchDataMisIncidencias();
    }
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (<Dashboard componente={<TableConocimiento />} />)

};

export const getIncidencias = incidencia =>({
  type: types.eventLoadedIncidencia,
  payload: incidencia
});

export const getIncidenciaId = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});

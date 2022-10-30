import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../store/store';
import { fetchIncidencias, fetchIncidenciasPersonas } from '../../../actions/incidencia'; 
import { types } from '../../../types/types';
import TableIncidencia from './TableIncidencia';
import { fetchMotivos } from '../../../actions/motivo';
import { fetchOrigen } from '../../../actions/origenIncidencia';
import Dashboard from '../base/layout/Dashboard';

export const Incidencia = () => {
  
  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataIncidencias = async () => {
    const response = await fetchIncidencias();
    dispatch(getIncidencias(response));
  }

  const fetchDataIncidenciasPersonas = async() => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaId(response));
  }

  const fetchDataMotivos = async ()=> {
    const response = await fetchMotivos();
    dispatch(getMotivos(response));
  }

  const fetchDataOrigenes = async ()=> {
    const response = await fetchOrigen();
    dispatch(getOrigenes(response));
  }

  useEffect(() => {
    if(store.getState().incidenciaId.checking){
      fetchDataIncidenciasPersonas();
    }
    if(store.getState().incidencia.checking){
      fetchDataIncidencias();
    }
    if(store.getState().motivo.checking){
      fetchDataMotivos();
    }
    if(store.getState().origenIncidencia.checking){
      fetchDataOrigenes();
    }
  });

  return (<Dashboard componente={<TableIncidencia />} />)

};

export const getIncidencias = incidencia =>({
  type: types.eventLoadedIncidencia,
  payload: incidencia
});

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

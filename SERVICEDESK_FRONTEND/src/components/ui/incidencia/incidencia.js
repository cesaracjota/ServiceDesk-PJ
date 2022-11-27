import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../store/store';
import { fetchIncidencias, fetchIncidenciasPersonas } from '../../../actions/incidencia'; 
import { types } from '../../../types/types';
import TableIncidencia from './TableIncidencia';
import { fetchMotivos } from '../../../actions/motivo';
import { fetchOrigen } from '../../../actions/origenIncidencia';
import Dashboard from '../base/layout/Dashboard';
import { useHistory } from 'react-router-dom';
import { ROLES } from '../../../helpers/roles';
import { fetchSedes } from '../../../actions/sede';
import { getSede } from '../sede/sede';

export const Incidencia = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const usuario = store.getState().auth;
  const { identificador } = useSelector(state => state.auth);
  
  if (usuario?.rol !== ROLES.ADMINISTRADOR && usuario?.rol !== ROLES.ASISTENTE_INFORMATICO ) {
    usuario?.rol === ROLES.SOPORTE_TECNICO  
    ? history.push('/dashboard/soporte-tecnico/home')
    : history.push('/dashboard/usuario/home')
  }

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

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
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
    if(store.getState().sede.checking){
      fetchDataSede();
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

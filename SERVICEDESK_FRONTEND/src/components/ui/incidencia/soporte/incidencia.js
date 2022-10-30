import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import { fetchIncidenciasPersonas, fetchIncidenciaSoporte, fetchTecnicosDisponibles } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableIncidenciaSoporte from './TableIncidencia';
import { fetchMotivos } from '../../../../actions/motivo';
import { fetchOrigen } from '../../../../actions/origenIncidencia';
import { getMotivos, getOrigenes } from '../incidencia';
import { loadConfiguracionBotones } from '../../../../actions/configurarBotones';
import { getConfiguracionBotones } from '../asistente/incidencia';
import Dashboard from '../../base/layout/Dashboard';

export const IncidenciaSoporte = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchIncidenciaSoporteData = async () => {
    const response = await fetchIncidenciaSoporte(identificador);
    dispatch(getIncidenciasAsignadasSoporte(response));
  }

  const fetchDataPersonas = async ()=> {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciasPersonas(response));
  }

  const fetchDataTecnicoDisponible = async ()=> {
    const response = await fetchTecnicosDisponibles();
    dispatch(getTecnicosDisponibles(response));  
  }

  const fetchDataMotivos = async ()=> {
    const response = await fetchMotivos();
    dispatch(getMotivos(response));
  }

  const fetchDataOrigenes = async ()=> {
    const response = await fetchOrigen();
    dispatch(getOrigenes(response));
  }

  const fetchConfiguracionBotones = async () => {
    const response = await loadConfiguracionBotones();
    dispatch(getConfiguracionBotones(response));
  }

  useEffect(() => {    
    if(store.getState().tecnicoDisponible.checking){
      fetchDataTecnicoDisponible();
    }
    if(store.getState().incidenciaId.checking){
      fetchDataPersonas();
    }
    if(store.getState().incidenciasAsignadasSoporte.checking){
      fetchIncidenciaSoporteData();
    }
    if(store.getState().motivo.checking){
      fetchDataMotivos();
    }
    if(store.getState().origenIncidencia.checking){
      fetchDataOrigenes();
    }
    if (store.getState().configuracionBotones.checking) {
      fetchConfiguracionBotones();
    }
  });

  return (<Dashboard componente={<TableIncidenciaSoporte />} />)

};

export const getIncidenciasAsignadasSoporte = incidenciasSoporte =>({
  type: types.eventLoadedIncidenciasAsignadasSoporte,
  payload: incidenciasSoporte
});

export const getIncidenciasPersonas = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});

export const getTecnicosDisponibles = tecnicoDisponibles => ({
  type: types.eventLoadedTecnicoDisponible,
  payload: tecnicoDisponibles
});
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import { 
  fetchIncidenciasPersonas, 
  fetchIncidenciasAsignadas, 
  fetchIncidenciasNoAsignadas, 
  fetchTecnicosDisponibles, 
  fetchMisIncidencias 
} from '../../../../actions/incidencia';
import { types } from '../../../../types/types';
import TableIncidenciaAsignados from './TableIncidenciaAsignadas';
import TableIncidenciaNoAsignados from './TableIncidenciaNoAsignado';
import TableMisIncidencias from './TableMisIncidencias';
import { getMotivos, getOrigenes } from '../incidencia';
import { fetchMotivos } from '../../../../actions/motivo';
import { fetchOrigen } from '../../../../actions/origenIncidencia';
import Configuraciones from './Configuraciones';
import { loadConfiguracionBotones } from '../../../../actions/configurarBotones';
import Dashboard from '../../base/layout/Dashboard';
import { getSede } from '../../sede/sede';
import { fetchSedes } from '../../../../actions/sede';

export const MisIncidencias = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataMisIncidencias = async () => {
    const response = await fetchMisIncidencias(identificador);
    dispatch(getMisIncidencias(response));
  }

  const fetchDataTecnicoDisponible = async () => {
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

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if (store.getState().misIncidencias.checking) {
      fetchDataMisIncidencias();
    }
    if (store.getState().tecnicoDisponible.checking) {
      fetchDataTecnicoDisponible();
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

  return (<Dashboard componente={<TableMisIncidencias />} />)

}

export const IncidenciaAsistenteAsignados = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataIncidenciasAsignadas = async () => {
    const response = await fetchIncidenciasAsignadas();
    dispatch(getIncidenciaAsignadas(response));
  }

  const fetchDataIncidenciasPersonas = async () => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaPersonas(response));
  }

  const fetchDataTecnicoDisponible = async () => {
    const response = await fetchTecnicosDisponibles();
    dispatch(getTecnicosDisponibles(response));
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if (store.getState().incidenciasAsignadas.checking) {
      fetchDataIncidenciasAsignadas();
    }
    if (store.getState().incidenciaId.checking) {
      fetchDataIncidenciasPersonas();
    }
    if (store.getState().tecnicoDisponible.checking) {
      fetchDataTecnicoDisponible();
    }
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (<Dashboard componente={<TableIncidenciaAsignados />} />)

};


export const IncidenciaAsistenteNoAsignados = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchDataIncidenciasNoAsignadas = async () => {
    const response = await fetchIncidenciasNoAsignadas();
    dispatch(getIncidenciaNoAsignadas(response));
  }

  const fetchDataIncidenciasPersonas = async () => {
    const response = await fetchIncidenciasPersonas(identificador);
    dispatch(getIncidenciaPersonas(response));
  }

  const fetchDataTecnicoDisponible = async () => {
    const response = await fetchTecnicosDisponibles();
    dispatch(getTecnicosDisponibles(response));
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if (store.getState().tecnicoDisponible.checking) {
      fetchDataTecnicoDisponible();
    }
    if (store.getState().incidenciaId.checking) {
      fetchDataIncidenciasPersonas();
    }
    if (store.getState().incidenciasNoAsignadas.checking) {
      fetchDataIncidenciasNoAsignadas();
    }
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (<Dashboard componente={<TableIncidenciaNoAsignados />} />)
  
};

export const Configuracion = () => {

  const dispatch = useDispatch();

  const fetchConfiguracionBotones = async () => {
    const response = await loadConfiguracionBotones();
    dispatch(getConfiguracionBotones(response));
  }

  useEffect(() => {
    if (store.getState().configuracionBotones.checking) {
      fetchConfiguracionBotones();
    }
  });

  return (<Dashboard componente={<Configuraciones />} />)

}


export const getIncidenciaAsignadas = incidenciasAsignadas => ({
  type: types.eventLoadedIncidenciasAsignadas,
  payload: incidenciasAsignadas
});

export const getIncidenciaNoAsignadas = incidenciasNoAsignadas => ({
  type: types.eventLoadedIncidenciasNoAsignadas,
  payload: incidenciasNoAsignadas
});

export const getIncidenciaPersonas = incidenciaId => ({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});

export const getTecnicosDisponibles = tecnicoDisponibles => ({
  type: types.eventLoadedTecnicoDisponible,
  payload: tecnicoDisponibles
});

export const getMisIncidencias = misIncidencias => ({
  type: types.eventLoadedMisIncidencias,
  payload: misIncidencias
});

export const getConfiguracionBotones = configuracionBotones => ({
  type: types.eventLoadedConfigurarBotones,
  payload: configuracionBotones
});
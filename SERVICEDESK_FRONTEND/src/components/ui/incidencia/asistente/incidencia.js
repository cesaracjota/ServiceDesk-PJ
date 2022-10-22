import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import Sidebar from '../../base/Sidebar';
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
  });

  return (
    <>
      <Sidebar componente={TableMisIncidencias} />
    </>
  )
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
  });

  return (
    <>
      <Sidebar componente={TableIncidenciaAsignados} />
    </>
  );
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
  });

  return (
    <>
      <Sidebar componente={TableIncidenciaNoAsignados} />
    </>
  );
};


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
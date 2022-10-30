import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { personaList } from '../../../actions/persona';
import { fetchPersonaOrgano } from '../../../actions/personaOrgano';
import { types } from '../../../types/types';
import TablePersona from './TablePersona';
import { perfilPersona } from '../../../actions/perfilPersona';
import { fetchSedes } from '../../../actions/sede';
import { fetchOrganos } from '../../../actions/organo';
import { fetchOficinas } from '../../../actions/oficina';
import { getOficinas } from '../oficina/oficina';
import { fetchCargos } from '../../../actions/cargo';
import { getCargos } from '../cargo/cargo';
import Dashboard from '../base/layout/Dashboard';

export const Persona = () => {

  const dispatch = useDispatch();

  const fetchDataPersonas = async () => {
    const response = await personaList();
    dispatch(getPersona(response));
  }

  const fetchDataPersonaOrgano = async () => {
    const response = await fetchPersonaOrgano();
    dispatch(getPersonaOrgano(response));
  }

  const fetchDataPerfilPersona = async () => {
    const response = await perfilPersona();
    dispatch(getPerfilPersona(response));
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  const fetchDataOrgano = async () => {
    const response = await fetchOrganos();
    dispatch(getOrgano(response));
  }

  const fetchDataOficinas = async () => {
    const response = await fetchOficinas();
    dispatch(getOficinas(response));
  }

  const fetchDataCargos = async () => {
    const response = await fetchCargos();
    dispatch(getCargos(response));
  }

  useEffect(() => {
    if(store.getState().persona.checking){
      fetchDataPersonas();
    }
    if(store.getState().personaOrgano.rows.checking){
      fetchDataPersonaOrgano();
    }
    if(store.getState().perfilPersona.checking){
      fetchDataPerfilPersona();
    }
    if(store.getState().sede.checking){
      fetchDataSede();
    }
    if(store.getState().organo.checking){
      fetchDataOrgano();
    }
    if(store.getState().oficina.checking){
      fetchDataOficinas();
    }
    if(store.getState().cargo.checking){
      fetchDataCargos();
    }
  });

  return (<Dashboard componente={<TablePersona />} />)

};

export const getPersona = persona =>({
  type: types.eventLoadedPersona,
  payload: persona,
});

export const getPersonaOrgano = personaOrgano =>({
  type: types.eventLoadedPersonaOrgano,
  payload: personaOrgano,
});

export const getPerfilPersona = perfil =>({
  type: types.eventLoadedPerfil,
  payload: perfil,
});

export const getSede = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});

export const getOrgano = organo =>({
  type: types.eventLoadedOrgano,
  payload: organo
});
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchOficinas } from '../../../actions/oficina'; 
import { types } from '../../../types/types';
import TableOficina from './TableOficina';
import { fetchSedes } from '../../../actions/sede';
import { fetchOrganos } from '../../../actions/organo';
import Dashboard from '../base/layout/Dashboard';
import { useHistory } from 'react-router-dom';
import { ROLES } from '../../../helpers/roles';

export const Oficina = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const usuario = store.getState().auth;

  if (usuario?.rol !== ROLES.ADMINISTRADOR && usuario?.rol !== ROLES.ASISTENTE_INFORMATICO ) {
    usuario?.rol === ROLES.SOPORTE_TECNICO  
    ? history.push('/dashboard/soporte-tecnico/home')
    : history.push('/dashboard/usuario/home')
  }

  const fetchDataSedes = async () => {
    const response = await fetchSedes();
    dispatch(getSedes(response));
  }

  const fetchDataOrganos = async () => {
    const response = await fetchOrganos();
    dispatch(getOrganos(response));
  }

  const fetchDataOficinas = async ()=> {
    const response = await fetchOficinas();
    dispatch(getOficinas(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSedes();
    }
    if(store.getState().organo.checking){
      fetchDataOrganos();
    }   
    if(store.getState().oficina.checking){
      fetchDataOficinas();
    }
  });

  return (<Dashboard componente={<TableOficina />} />)

};

export const getSedes = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});

export const getOrganos = organo =>({
  type: types.eventLoadedOrgano,
  payload: organo
});

export const getOficinas = oficina =>({
  type: types.eventLoadedOficina,
  payload: oficina
});
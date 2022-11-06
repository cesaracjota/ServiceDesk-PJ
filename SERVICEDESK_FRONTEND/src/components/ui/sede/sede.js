import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchSedes } from '../../../actions/sede'; 
import { types } from '../../../types/types';
import TableSede from './TableSede';
import Dashboard from '../base/layout/Dashboard';
import { ROLES } from '../../../helpers/roles';
import { useHistory } from 'react-router-dom';

export const Sede = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const usuario = store.getState().auth;

  if (usuario?.rol !== ROLES.ADMINISTRADOR && usuario?.rol !== ROLES.ASISTENTE_INFORMATICO ) {
    usuario?.rol === ROLES.SOPORTE_TECNICO  
    ? history.push('/dashboard/soporte-tecnico/home')
    : history.push('/dashboard/usuario/home')
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (<Dashboard componente={<TableSede />} />)

};

export const getSede = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});

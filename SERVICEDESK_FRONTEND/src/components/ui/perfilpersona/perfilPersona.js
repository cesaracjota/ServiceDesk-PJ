import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Tables from './TablePerfilPersona';
import { perfilPersona } from '../../../actions/perfilPersona'; 
import { types } from '../../../types/types';
import Dashboard from '../base/layout/Dashboard';

export const PerfilPersona = () => {
  const dispatch = useDispatch();

  const fetchDataPerfilPersona = async () => {
    const response = await perfilPersona();
    dispatch(getPerfilPersona(response));
  }

  useEffect(() => {
    if(store.getState().perfilPersona.rows.length <= 0){
      fetchDataPerfilPersona();
    }
  });

  return (<Dashboard componente={<Tables />} />)

};

export const getPerfilPersona = perfil =>({
  type: types.eventLoadedPerfil,
  payload: perfil,
});

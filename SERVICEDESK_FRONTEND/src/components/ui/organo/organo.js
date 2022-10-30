import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchOrganos } from '../../../actions/organo'; 
import { types } from '../../../types/types';
import TableOrgano from './TableOrgano';
import { fetchSedes } from '../../../actions/sede';
import Dashboard from '../base/layout/Dashboard';

export const Organo = () => {
  const dispatch = useDispatch();

  const fetchDataOrganos = async () => {
    const response = await fetchOrganos();
    dispatch(getOrganos(response));
  }

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if(store.getState().organo.checking){
      fetchDataOrganos();
    }
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (<Dashboard componente={<TableOrgano />} />)

};

export const getOrganos = organo =>({
  type: types.eventLoadedOrgano,
  payload: organo
});

export const getSede = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchSedes } from '../../../actions/sede'; 
import { types } from '../../../types/types';
import TableSede from './TableSede';

export const Sede = () => {
  const dispatch = useDispatch();

  const fetchDataSede = async () => {
    const response = await fetchSedes();
    dispatch(getSede(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSede();
    }
  });

  return (
    <>
      <Sidebar componente={TableSede} />
    </>
  );
};

export const getSede = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});

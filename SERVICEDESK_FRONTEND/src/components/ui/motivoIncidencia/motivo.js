import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchMotivos } from '../../../actions/motivo';
import { types } from '../../../types/types';
import TableMotivo from './TableMotivo';

export const Motivo = () => {
  
  const dispatch = useDispatch();

  const fetchDataMotivos = async ()=> {
    const response = await fetchMotivos();
    dispatch(getMotivo(response));
  }

  useEffect(() => {
    if(store.getState().motivo.checking){
      fetchDataMotivos();
    }
  });

  return (
    <>
      <Sidebar componente={TableMotivo} />
    </>
  );
};

export const getMotivo = motivo =>({
  type: types.eventLoadedMotivo,
  payload: motivo
});

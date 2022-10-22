import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchCargos } from '../../../actions/cargo'; 
import { types } from '../../../types/types';
import TableCargo from './TableCargo';

export const Cargo = () => {
  const dispatch = useDispatch();

  const fetchDataCargos = async ()=> {
    const response = await fetchCargos();
    dispatch(getCargos(response));
  }

  useEffect(() => {
    if(store.getState().cargo.checking){
      fetchDataCargos();
    }
  });

  return (
    <>
      <Sidebar componente={TableCargo} />
    </>
  );
};

export const getCargos = cargo =>({
  type: types.eventLoadedCargo,
  payload: cargo
});

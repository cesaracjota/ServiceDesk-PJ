import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchCargos } from '../../../actions/cargo'; 
import { types } from '../../../types/types';
import TableCargo from './TableCargo';
import Dashboard from '../base/layout/Dashboard';

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

  return (<Dashboard componente={<TableCargo />} />)

};

export const getCargos = cargo =>({
  type: types.eventLoadedCargo,
  payload: cargo
});

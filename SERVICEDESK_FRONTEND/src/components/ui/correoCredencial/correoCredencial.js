import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchListCorreoCredencial } from '../../../actions/correoCredencial'; 
import { types } from '../../../types/types';
import TableCorreoCredencial from './TableCorreoCredencial';
import Dashboard from '../base/layout/Dashboard';

export const CorreoCredencial = () => {
  const dispatch = useDispatch();

  const fetchData = async ()=> {
    const response = await fetchListCorreoCredencial();
    dispatch(getCorreoCredencial(response));
  }

  useEffect(() => {
    if(store.getState().correoCredencial.checking){
      fetchData();
    }
  });

  return (<Dashboard componente={<TableCorreoCredencial />} />)

};

export const getCorreoCredencial = (correoCredencial) =>({
  type: types.eventLoadedCorreoCredencial,
  payload: correoCredencial
});
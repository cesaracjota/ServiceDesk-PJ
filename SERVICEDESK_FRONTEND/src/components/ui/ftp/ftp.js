import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import { fetchListFtp } from '../../../actions/ftp'; 
import { types } from '../../../types/types';
import TableFtp from './TableFtp';
import Dashboard from '../base/layout/Dashboard';

export const Ftp = () => {
  
  const dispatch = useDispatch();

  const fetchDataFtp = async () => {
    const response = await fetchListFtp();
    dispatch(getFtp(response));
  }

  useEffect(() => {
    if(store.getState().ftp.checking){
      fetchDataFtp();
    }
  });

  return (<Dashboard componente={<TableFtp />} />)

};

export const getFtp = ftp =>({
  type: types.eventLoadedFtp,
  payload: ftp
});
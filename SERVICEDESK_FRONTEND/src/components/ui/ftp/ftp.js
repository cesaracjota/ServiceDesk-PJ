import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchListFtp } from '../../../actions/ftp'; 
import { types } from '../../../types/types';
import TableFtp from './TableFtp';

export const Ftp = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchListFtp().then((res)=>{
      dispatch(getFtp(res));
    }).catch((err)=>{
      // console.log(err);
    });
  }

  useEffect(() => {
    if(store.getState().ftp.checking){
      fetchData();
    }
  });

  return (
    <>
      <Sidebar componente={TableFtp} />
    </>
  );
};

export const getFtp = ftp =>({
  type: types.eventLoadedFtp,
  payload: ftp
});
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchListCorreoCredencial } from '../../../actions/correoCredencial'; 
import { types } from '../../../types/types';
import TableCorreoCredencial from './TableCorreoCredencial';

export const CorreoCredencial = () => {
  const dispatch = useDispatch();

  const fetchData = async ()=> {
    await fetchListCorreoCredencial().then((res)=>{
      dispatch(getCorreoCredencial(res));
    }).catch((err)=>{
      // console.log(err);
    });
  }

  useEffect(() => {
    if(store.getState().correoCredencial.checking){
      fetchData();
    }
  }, [dispatch]);

  return (
    <>
      <Sidebar componente={TableCorreoCredencial} />
    </>
  );
};

export const getCorreoCredencial = (correoCredencial) =>({
  type: types.eventLoadedCorreoCredencial,
  payload: correoCredencial
});
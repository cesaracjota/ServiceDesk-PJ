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
    const response = await fetchListCorreoCredencial();
    dispatch(getCorreoCredencial(response));
  }

  useEffect(() => {
    if(store.getState().correoCredencial.checking){
      fetchData();
    }
  });

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
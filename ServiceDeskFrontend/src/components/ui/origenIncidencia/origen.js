import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchOrigen } from '../../../actions/origenIncidencia';
import { types } from '../../../types/types';
import TableOrigen from './TableOrigenIncidencia';

export const OrigenIncidencia = () => {

  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchOrigen().then((res)=>{
      dispatch(getOrigen(res));
    }).catch((err)=>{
      // console.log("WARN " + err);
    });
  }

  useEffect(() => {    
    if(store.getState().origenIncidencia.checking){
      fetchData();
    }
  });

  return (
    <>
      <Sidebar componente={TableOrigen} />
    </>
  );
};

export const getOrigen = origen =>({
  type: types.eventLoadedOrigenIncidencia,
  payload: origen
});

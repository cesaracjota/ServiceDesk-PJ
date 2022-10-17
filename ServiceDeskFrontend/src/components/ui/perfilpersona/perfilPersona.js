import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import Tables from './TablePerfilPersona';
import { perfilPersona } from '../../../actions/perfilPersona'; 
import { types } from '../../../types/types';

export const PerfilPersona = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await perfilPersona().then((res)=>{
      dispatch(getPerfilPersona(res));
    }).catch((err)=>{
      // console.log("WARN " + err);
    });
  }

  useEffect(() => {
    if(store.getState().perfilPersona.rows.length <= 0){
      fetchData();
    }
  });

  return (
    <>
      <Sidebar componente={Tables} />
    </>
  );
};

export const getPerfilPersona = perfil =>({
  type: types.eventLoadedPerfil,
  payload: perfil,
});

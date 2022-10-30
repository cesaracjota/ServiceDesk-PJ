import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CorreoIndex from './CorreoIndex';
import { store } from '../../../store/store';
import { fetchCorreoEnviado, fetchCorreoRecibido } from '../../../actions/correo';
import { types } from '../../../types/types';
import Dashboard from '../base/layout/Dashboard';

export const Correo = () => {
  //
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  const fetchCorreoRecibidoData = async () => {
    await fetchCorreoRecibido(identificador).then(res => {
      dispatch(getCorreosRecibidos(res));
    });
  };

  const fetchCorreoEnviadoData = async () => {
    await fetchCorreoEnviado(identificador).then(res => {
      dispatch(getCorreosEnviados(res));
    });
  };

  useEffect(() => {
    if (store.getState().correoRecibido.checking) {
      fetchCorreoRecibidoData();
    }
    if (store.getState().correoEnviado.checking) {
      fetchCorreoEnviadoData();
    }
  });

  return (<Dashboard componente={<CorreoIndex />} />)

};

export const getCorreosRecibidos = correoRecibido => ({
  type: types.eventLoadedCorreoRecibido,
  payload: correoRecibido,
});

export const getCorreosEnviados = correoEnviado => ({
  type: types.eventLoadedCorreoEnviado,
  payload: correoEnviado,
});

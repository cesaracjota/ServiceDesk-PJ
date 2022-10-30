import React, { useEffect } from 'react';
import { fetchSedes } from '../../../../../actions/sede';
import { store } from '../../../../../store/store';
import IncidenciaReportes from './IncidenciaReportes';
import SegundoReporte from './SegundoReporte';
import TercerReporte from './TercerReporte';
import { useDispatch } from 'react-redux';
import { types } from '../../../../../types/types';
import Dashboard from '../../../base/layout/Dashboard';

export const ReporteIncidencia = () => {

  const dispatch = useDispatch();

  const fetchDataSedes = async () => {
    const response = await fetchSedes();
    dispatch(getSedes(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSedes();
    }
  });

  return (<Dashboard componente={<IncidenciaReportes />} />)

};

export const IncidenciaSegundoReporte = () => {

  const dispatch = useDispatch();

  const fetchDataSedes = async () => {
    const response = await fetchSedes();
    dispatch(getSedes(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSedes();
    }
  });

  return (<Dashboard componente={<SegundoReporte />} />)

};

export const IncidenciaTercerReporte = () => {

  const dispatch = useDispatch();

  const fetchDataSedes = async () => {
    const response = await fetchSedes();
    dispatch(getSedes(response));
  }

  useEffect(() => {
    if(store.getState().sede.checking){
      fetchDataSedes();
    }
  });

  return (<Dashboard componente={<TercerReporte />} />)

};

export const getSedes = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});
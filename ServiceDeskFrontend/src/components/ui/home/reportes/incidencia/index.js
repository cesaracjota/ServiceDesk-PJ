import React, { useEffect } from 'react';
import { fetchSedes } from '../../../../../actions/sede';
import { store } from '../../../../../store/store';
import Sidebar from '../../../base/Sidebar';
import IncidenciaReportes from './IncidenciaReportes';
import SegundoReporte from './SegundoReporte';
import TercerReporte from './TercerReporte';
import { useDispatch } from 'react-redux';
import { types } from '../../../../../types/types';

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
  },[]);

  return (
    <>
      <Sidebar componente={IncidenciaReportes} />
    </>
  );
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
  },[]);

  return (
    <>
      <Sidebar componente={SegundoReporte} />
    </>
  );
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
  },[]);

  return (
    <>
      <Sidebar componente={TercerReporte} />
    </>
  );
};

export const getSedes = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});
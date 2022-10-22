import React from 'react';
import Sidebar from '../base/Sidebar';
import Inicio from './Inicio';
export const home = () => {

    return (
      <>
        <Sidebar componente={Inicio}/>
      </>
    );
  };
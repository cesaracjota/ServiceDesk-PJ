import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getCargos } from '../components/ui/cargo/cargo';

// CREATE SEDE

export const createCargo = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `cargos`,
      {
        cargo: data.cargo,
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getCargos(await loadCargo()));
      notification('CARGO REGISTRADO', 'EL CARGO SE HA REGISTRADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE REGISTRO', 'EL CARGO NO SE PUDO REGISTRAR CORRECTAMENTE', 'error');
    }
  };
};

// LIST CARGO

export const fetchCargos = async () => {
  try {
    const response = await fetchToken('cargos');
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      const Cargo = {};
      Cargo.data = data;
      return Cargo;
    }
  } catch (error) {
    // console.log("WARN " + error);
  }
};

export const fetchCargo = async (id) => {
  try {
    const response = await fetchToken(`cargos/${id}`);
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      const Cargo = {};
      Cargo.data = data;
      return Cargo;
    }
  } catch (error) {
    // console.log(error);
  }
};

//  UPDATE SEDE

export const updateCargo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `cargos`,
      {
        idCargo: data.idCargo,
        cargo: data.cargo,
        activo: data.activo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getCargos(await loadCargo()));
      notification('CARGO MODIFICADO', 'EL CARGO HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL CARGO, CORRECTAMENTE ', 'error');
    }
  };
};

//  DELETE / DISABLED SEDE

export const deleteCargo = (id) => {
  return async dispatch => {
    const response = await fetchToken(`cargos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getCargos(await loadCargo()));
      notification('CARGO MODIFICADO', 'EL CARGO HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL CARGO, CORRECTAMENTE', 'error');
    }
  };
};

// Refrescar la tabla

export const loadCargo = async () => {
  try {
    const response = await fetchToken('cargos');
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      const data = await response.json();
      const Cargo = {};
      Cargo.data = data;
      return Cargo;
    }
  } catch (error) {
    // console.log(error);
  }
};

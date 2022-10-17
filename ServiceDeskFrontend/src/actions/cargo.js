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
      notification('Cargo registrado', 'Cargo se ha registrado correctamente.', 'success');
    } else {
      notification('Error de registro', 'No se pudo registrar el Cargo', 'error');
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
      notification('Cargo actualizado', 'Cargo se ha actualizado correctamente', 'success');
    } else {
      notification('Error de actualización', 'No se pudo actualizar el Cargo', 'error');
    }
  };
};

//  DELETE / DISABLED SEDE

export const deleteCargo = id => {
  return async dispatch => {
    const response = await fetchToken(`cargos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getCargos(await loadCargo()));
      notification('Cargo modificado', 'Cargo se ha actualizado su estado correctamente', 'success');
    } else {
      notification('Error de actualización', 'No se pudo eliminar el Cargo', 'error');
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

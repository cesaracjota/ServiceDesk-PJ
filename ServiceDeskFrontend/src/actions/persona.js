import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersona } from '../components/ui/persona/persona';
import { startLogin } from './auth';

// // CREATE PERSONA

export const createPersona = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.usuario,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        telefono: data.telefono,
        anexo: data.anexo,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {
          idPerfilPersona: data.perfilPersona.idPerfilPersona
        }
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getPersona(await loadPersona()));
      notification('Usuario registrado correctamente.', 'Se logró registrar satisfactoriamente', 'success');
    } else {
      notification('No se pudo registrar el Usuario', 'Revisa si los datos son correctos', 'error');
    }
  };
};

export const createPersonaRegister = data => {
  return async dispatch => {
    const response = await fetchToken(
      `personas/register`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.dni,
        password: data.password,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {
          idPerfilPersona: 4
        }
      },
      'POST'
    );
    if (response.status === 200 || response.status === 201) {
      dispatch(startLogin(data.dni, data.password));
      notification('Usuario registrado correctamente.', 'Se logró registrar satisfactoriamente', 'success');
    } else {
      notification('No se pudo registrar el Usuario', 'Revisa si los datos son correctos', 'error');
    }
  };
};


export const personaList = async () => {
  const response = await fetchToken('personas');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
};

// ACTUALIZAR ORGANO

export const updatePersona = (data) => {

  var idPerfilPersona = {};
  if (data.perfilPersona.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona.idPerfilPersona),
    };
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona),
    };
  }

  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
        idpersona: data.idpersona,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.usuario,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        telefono: data.telefono,
        anexo: data.anexo,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: idPerfilPersona
      },
      'PUT'
    );

    // const body = await response.json();

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('Persona actualizado', 'Persona actualizado correctamente', 'success');
    } else {
      notification('Error al actualizar', 'No se pudo actualizar la persona', 'error');
    }
  };
};

export const fetchUsuarioId = async (id) => {
  const response = await fetchToken(`personas/${id}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
}

// DELETE / DISABLED ORGANO

export const deletePersona = id => {
  return async dispatch => {
    const response = await fetchToken(`personas/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('Persona actualizado correctamente', 'Se logró eliminar correctamente', 'success');
    } else {
      notification('No se pudo eliminar la Persona', 'No se logró eliminar correctamente', 'error');
    }
  };
};

// Consulta API reniec para obtener datos de persona

export const consultaReniec = async (dni) => {
    const response = await fetchToken(`reniec/${dni}`);
    if (!response.ok) {
      throw new Error(response.status);
    } else {
        const data = await response.json();
        const Persona = {};
        Persona.data = data;
        return Persona;
    }
}

// Busqueda de usuarios por apellido
export const buscarPersonaApellido = async (apellido) => {
  const response = await fetchToken(`personas/buscar/apellido?apellido=${apellido}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
}

// Refrescar la tabla

export const loadPersona = async () => {
  const response = await fetchToken('personas');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Persona = {};
    Persona.data = data;
    return Persona;
  }
};
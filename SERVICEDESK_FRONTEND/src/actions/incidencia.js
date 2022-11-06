import { fetchIncidencia, fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencias } from '../components/ui/incidencia/incidencia';
import { getIncidenciaNoAsignadas, getIncidenciaAsignadas } from '../components/ui/incidencia/asistente/incidencia';

// CREATE PERSONA

export const createIncidencia = (data) => {
  return async dispatch => {
    var formData = new FormData();

    if (data.historialIncidencia[0].persona_asignado !== undefined) {
      formData.append('archivo', data.archivo);
      formData.append('descripcion', data.descripcion);
      formData.append('persona', data.persona.idpersona);
      formData.append('motivo', data.motivo.idMotivo);
      formData.append('origen', data.origen.idOrigen);
      formData.append('historialIncidencia[0].persona_registro.idpersona', data.historialIncidencia[0].persona_registro.idpersona);
      formData.append('historialIncidencia[0].persona_asignado.idpersona', data.historialIncidencia[0].persona_asignado.idpersona);
      formData.append('historialIncidencia[0].persona_notifica.idpersona', data.historialIncidencia[0].persona_notifica.idpersona);
    } else {
      formData.append('archivo', data.archivo);
      formData.append('descripcion', data.descripcion);
      formData.append('persona', data.persona.idpersona);
      formData.append('motivo', data.motivo.idMotivo);
      formData.append('origen', data.origen.idOrigen);
      formData.append('historialIncidencia[0].persona_registro.idpersona', data.historialIncidencia[0].persona_registro.idpersona);
      formData.append('historialIncidencia[0].persona_notifica.idpersona', data.historialIncidencia[0].persona_notifica.idpersona);
    }
    const response = await fetchIncidencia(`incidencias/usuariocomun`, formData, 'POST');
    if (response.status === 200) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidencias(await fetchIncidencias()));
      const body = await response.json();
      notification('INCIDENCIA CREADA', `LA INCIDENCIA HA SIDO CREADA CORRECTAMENTE \n \n NUMERO DE COLA EN ESPERA = ${body}`, 'success');
    } else if (response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidencias(await fetchIncidencias()));
      notification('INCIDENCIA CREADA', 'LA INCIDENCIA HA SIDO CREADA CORRECTAMENTE', 'success');
    }else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ REGISTRAR LA INCIDENCIA', 'error');
    }
  };
};

export const createIncidenciaUsuario = (data) => {
  return async dispatch => {
    var formData = new FormData();
    formData.append("archivo", data.archivo);
    formData.append("descripcion", data.descripcion);
    formData.append("persona", data.persona.idpersona);
    formData.append("motivo", data.motivo.idMotivo);
    formData.append("origen", data.origen.idOrigen);
    formData.append("historialIncidencia[0].persona_registro.idpersona", data.historialIncidencia[0].persona_registro.idpersona);
    formData.append("historialIncidencia[0].persona_notifica.idpersona", data.historialIncidencia[0].persona_notifica.idpersona);
    const response = await fetchIncidencia(`incidencias/usuariocomun`, formData, 'POST');
    if (response.status === 200) {
      const body = await response.json();
      notification('INCIDENCIA CREADA', `LA INCIDENCIA HA SIDO CREADA CORRECTAMENTE \n \n NUMERO DE COLA EN ESPERA = ${body}`, 'success');
    } else if (response.status === 201) {
      notification('INCIDENCIA CREADA', 'LA INCIDENCIA HA SIDO CREADA CORRECTAMENTE', 'success');
    }else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ REGISTRAR LA INCIDENCIA', 'error');
    }
  };
};

// ASIGNACION DE INCIDENCIAS A SOPORTES TECNICOS

export const asignarIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/asignacion`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: [{
          persona_registro: {
            idpersona: data.historialIncidencia[0].persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia[0].persona_asignado.idpersona
          },
          persona_notifica: {
            idpersona: data.historialIncidencia[0].persona_notifica.idpersona
          }
        }]
      },
      'PUT'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      notification('INCIDENCIA ASIGNADA', 'LA INCIDENCIA HA SIDO ASIGNADA CORRECTAMENTE', 'success');
    }
    else {
      notification('ERROR DE ASIGNACIÓN', 'NO SE LOGRÓ ASIGNAR LA INCIDENCIA', 'error');
    }
  };
};


export const reAsignarIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/reasignacion`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: [{
          persona_registro: {
            idpersona: data.historialIncidencia[0].persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia[0].persona_asignado.idpersona
          },
          persona_notifica: {
            idpersona: data.historialIncidencia[0].persona_notifica.idpersona
          }
        }]
      },
      'PUT'
    );

    // const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      notification('INCIDENCIA RE-ASIGNADA', 'LA INCIDENCIA HA SIDO RE-ASIGNADA CORRECTAMENTE', 'success');
    }
    else {
      notification('ERROR DE RE-ASIGNACIÓN', 'NO SE LOGRÓ RE-ASIGNAR LA INCIDENCIA', 'error');
    }
  };
};

// RESET STATUS INCIDENCIA

export const resetEstadoIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/reset`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: [{
          persona_registro: {
            idpersona: data.historialIncidencia[0].persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia[0].persona_asignado.idpersona
          },
          persona_notifica: {
            idpersona: data.historialIncidencia[0].persona_notifica.idpersona
          }
        }]
      },
      'PUT'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      notification('ESTADO ACTUALIZADA', 'EL ESTADO DE LA INCIDENCIA HA SIDO RESETEADA CORRECTAMENTE', 'success');
    }
    else {
      notification('ERROR AL ACTUALIZAR', 'NO SE LOGRÓ ACTUALIZAR EL ESTADO LA INCIDENCIA', 'error');
    }
  };
}

// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRAMITE

export const createDescripcionTramite = (data) => {
  return async dispatch => {
    var formData = new FormData();
    formData.append('archivo', data.archivo);
    formData.append('descripcionTramite', data.descripcion);
    formData.append('incidencia', data.incidencia);
    const response = await fetchIncidencia(`incidencia/descripcion/tramite`, formData, 'POST');
    if (response.status === 200 || response.status === 201) {
      notification('INCIDENCIA ACTUALIZADA', 'ESTADO DE LA INCIDENCIA HA SIDO MODIFICADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE MODIFICACIÓN', 'NO SE LOGRÓ MODIFICAR ESTADO DE LA INCIDENCIA', 'error');
    }
  };
}


// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRAMITE
export const updateDescripcionAtendido = (data) => {
  return async dispatch => {
    var formData = new FormData();
    formData.append('idDescripcionIncidencia', data.idDescripcionIncidencia);
    formData.append('descripcionTramite', data.descripcionTramite);
    formData.append('archivo', data.archivo);
    formData.append('descripcionAtencion', data.descripcion);
    formData.append('incidencia', data.incidencia);
    const response = await fetchIncidencia(`incidencia/descripcion/update`, formData, 'PUT');
    if (response.status === 200 || response.status === 201) {
      notification('ATENCIÓN REGISTRADA', 'LA ATENCIÓN DE LA INCIDENCIA HA SIDO REGISTRADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ REGISTRAR LA ATENCIÓN DE LA INCIDENCIA', 'error');
    }
  };
}

// SOLUCION DE LA INCIDENCIA

export const createDescripcionAtendido = (data) => {
  return async dispatch => {
    var formData = new FormData();
    formData.append('archivo', data.archivo);
    formData.append('descripcionAtencion', data.descripcion);
    formData.append('incidencia', data.incidencia);
    const response = await fetchIncidencia(`incidencia/descripcion/atendido`, formData, 'POST');
    if (response.status === 200 || response.status === 201) {
      notification('ATENCIÓN REGISTRADA', 'LA ATENCIÓN DE LA INCIDENCIA HA SIDO REGISTRADO CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE REGISTRO', 'NO SE LOGRÓ REGISTRAR LA ATENCIÓN DE LA INCIDENCIA', 'error');
    }
  };
};

export const fetchIncidencias = async () => {
  const response = await fetchToken('incidencias');
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    const Incidencia = {};
    Incidencia.data = data;
    return Incidencia;
  }
}

export const fetchIncidenciasPersonas = async (id) => {
  const response = await fetchToken('incidencias/persona/' + id);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Incidencia = {};
    Incidencia.data = data;
    return Incidencia;
  }
};

//LISTAR INCIDENCIA POR ID PARA VER LOS DETALLES

export const fetchIncidenciaDetalles = async (id) => {
  const response = await fetchToken('incidencias/persona/detalles/' + id);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Incidencia = {};
    Incidencia.data = data;
    return Incidencia;
  }
};

// MOSTRAR INCIDENCIAS ASIGNADAS

export const fetchIncidenciasAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/asignados');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const IncidenciaAsignados = {};
    IncidenciaAsignados.data = data;
    return IncidenciaAsignados;
  }
};

// LISTAR INCIDENCIAS NO ASIGNADAS

export const fetchIncidenciasNoAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/noasignados');
  if (response.status === 404) {
    const IncidenciaNoAsignados = {};
    IncidenciaNoAsignados.data = [];
    return IncidenciaNoAsignados;
  } else if (response.ok) {
    const data = await response.json();
    const IncidenciaNoAsignados = {};
    IncidenciaNoAsignados.data = data;
    return IncidenciaNoAsignados;
  }
};

//LISTAR INCIDENCIAS ASIGNADOS AL USUARIO

export const fetchIncidenciaSoporte = async (id) => {
  const response = await fetchToken(`incidencias/persona/asignado/${id}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Incidencia = {};
    Incidencia.data = data;
    return Incidencia;
  }
};

// INCIDENCIAS ASIGNADAS A COORDINADORES Y ASISTENTES INFORMATICOS

export const fetchMisIncidencias = async (id) => {
  const response = await fetchToken(`incidencias/persona/asignado/${id}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const MisIncidencias = {};
    MisIncidencias.data = data;
    return MisIncidencias;
  }
};


// DESCARGAR O VISUALIZAR ARCHIVOS FTP
export const fetchDescargarArchivo = (data) => {
  return async dispatch => {
    var formdata = new FormData();
    formdata.append("RUTA", data.carpeta);
    formdata.append("ARCHIVO", data.archivo);
    formdata.append("MODULO", data.modulo);

    const response = await fetchIncidencia(`incidencias/downloadFile`, formdata, 'POST');
    if (response.status === 200 || response.status === 201) {
      return response;
    }
  }
}

export const fetchViewArchivo = async (filename) => {
  const response = await fetchToken(`incidencias/viewFile/${filename}`);
  if (response.status === 200 || response.status === 201) {
    const extensionType = await response.url;
    var datos = [];
    if (extensionType.includes(".pdf")) {

      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob: blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos;

    } else if (extensionType.includes(".png")) {
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/png' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob: blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos
    } else if (extensionType.includes(".jpg")) {
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/jpg' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob: blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos
    } else if (extensionType.includes(".jpeg")) {
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/jpeg' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob: blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos
    } else if (extensionType.includes(".docx")) {
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/docx' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob: blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos
    }

    return datos;

  } else {
    return null;
  }
}

// LISTAR SOLUCIONES DE LA INCIDENCIA

export const fetchDetallesIncidenciaAtendida = async (id) => {
  const response = await fetchToken(`incidencia/descripcion/incidencia/${id}`);
  const body = await response.json();
  const SolucionIncidencia = {
    idDescripcionIncidencia: body.idDescripcionIncidencia,
    descripcionAtencion: body.descripcionAtencion,
    descripcionTramite: body.descripcionTramite,
    estado: body.estado,
    incidenciaArchivos: body.incidenciaArchivos,
  };
  // set user info
  return SolucionIncidencia;
}


// DELETE 

export const deleteIncidencia = (id) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/${id}`, '', 'DELETE');
    if (response.status === 200) {
      dispatch(getIncidencias(await loadIncidencias()));
      notification('INCIDENCIA ELIMINADA', 'LA INCIDENCIA HA SIDO ELIMINADA CORRECTAMENTE', 'success');
    } else {
      notification('ERROR DE ELIMINACIÓN', 'NO SE LOGRÓ ELIMINAR LA INCIDENCIA', 'error');
    }
  };
};

// Refrescar la tabla

export const loadIncidencias = async (id) => {
  const response = await fetchToken('incidencias/personas/' + id);
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Incidencias = {};
    Incidencias.data = data;
    return Incidencias;
  }
};


// MOSTRAR TECNICOS DISPONIBLES

export const fetchTecnicosDisponibles = async () => {
  const response = await fetchToken('tecnico/');
  if (!response.ok) {
    throw new Error(response.status);
  } else {
    const data = await response.json();
    const Tecnicos = {};
    Tecnicos.data = data;
    return Tecnicos;
  }
};

// BUSCAR POR DNI

export const buscarUsuarioDni = async (dni) => {
  const response = await fetchToken(`personas/dni/${dni}`);
  const body = await response.json();
  const PersonasDni = {
    idpersona: body.idpersona,
    nombre: body.nombre,
    apellido: body.apellido,
    usuario: body.usuario,
    correo: body.correo,
    celular: body.celular,
    telefono: body.telefono,
    anexo: body.anexo,
    fecha: body.fecha,
    sexo: body.sexo,
    dni: body.dni,
    activo: body.activo,
    oficina: body.oficina,
    perfilPersona: body.perfilPersona
  };

  return PersonasDni;

}
import { fetchIncidencia, fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencias } from '../components/ui/incidencia/incidencia';
import { getIncidenciaNoAsignadas, getIncidenciaAsignadas } from '../components/ui/incidencia/asistente/incidencia';

// CREATE PERSONA

export const createIncidencia = (data) => {
  return async dispatch => {
    var formData = new FormData();

    if (data.historialIncidencia[0].persona_asignado !== undefined){
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
    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidencias(await fetchIncidencias()));
      notification('Incidencia Creada', 'La incidencia ha sido creada correctamente', 'success');
    } else {
      notification('Error de Registro', 'No se pudo registrar la Incidencia', 'error');
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

    if (response.status === 200 || response.status === 201) {
      notification('Incidencia registrada', 'La incidencia ha sido registrada correctamente.', 'success');
    } else {
      notification('No se pudo registrar la Incidencia', '', 'error');
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
      notification('Incidencia Asignada', 'Incidencia ha sido asignado correctamente.', 'success');
    }
    else {
      notification('No se pudo asignar la incidencia', 'No se ha logrado asignar correctamente', 'error');
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
      notification('Incidencia Re-Asignada', 'Incidencia Re-Asignada correctamente al técnico.', 'success');
    }
    else {
      notification('Error de Re-Asignarción', 'No se pudo Re-Asignar la Incidencia', 'error');
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
      notification('Estado Incidencia Actualizada', 'Estado incidencia reseteada correctamente.', 'success');
    }
    else {
      notification('Error al Actualizar', 'No se pudo resetear estado de la incidencia', 'error');
    }
  };
}


// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE

export const incidenciaEnTramite = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/tramite/`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: [data.historialIncidencia[0]]
      }, 'PUT');
    if (response.status === 200 || response.status === 201) {
      notification('Incidencia actualizada', 'Incidencia actualizada correctamente.', 'success');
    }
    else {
      notification('Error al actualizar','No se pudo actualizar el estado de la Incidencia', 'error');
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
  }else{
    const data = await response.json();
    const IncidenciaAsignados = {};
    IncidenciaAsignados.data = data;
    return IncidenciaAsignados;
  }
};

// LISTAR INCIDENCIAS NO ASIGNADAS

export const fetchIncidenciasNoAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/noasignados');
  if(response.status === 404){
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
  }else{
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
  }else{
    const data = await response.json();
    const MisIncidencias = {};
    MisIncidencias.data = data;
    return MisIncidencias;
  }
};

// SOLUCION DE LA INCIDENCIA

export const createSolucionIncidencia = (data) => {
  return async dispatch => {
    var formData = new FormData();
    formData.append('archivo', data.archivo);
    formData.append('descripcion', data.descripcion);
    formData.append('incidencia', data.incidencia);
    const response = await fetchIncidencia(`incidencia/descripcion/save`, formData, 'POST');
    if (response.status === 200 || response.status === 201) {
      notification('Atención Registrado', 'Atención de la Incidencia registrado correctamente.', 'success');
    } else {
      notification('Error de Registro de la Atención', 'No se pudo registrar la Atención de la Incidencia correctamente', 'error');
    }
  };
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
    } else {
      notification('Error de Descarga', 'No se pudo descargar el archivo correctamente', 'error');
    }
  }
}

export const fetchViewArchivo = async (filename) => {
  const response = await fetchToken(`incidencias/viewFile/${filename}`);
  if (response.status === 200 || response.status === 201) {
    const extensionType = await response.url;
    var datos = [];
    if(extensionType.includes(".pdf")){
      
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob : blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos;

    }else if(extensionType.includes(".png")){
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/png' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob : blob,
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
        blob : blob,
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
        blob : blob,
        url: blobURL,
        filename: filename,
        link: fileURL,
      })

      return datos
    } else if(extensionType.includes(".docx")){
      const blob = await response.blob();
      const blobURL = new Blob([blob], { type: 'application/docx' });
      const fileURL = URL.createObjectURL(blobURL);
      datos.push({
        blob : blob,
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
    descripcion: body.descripcion,
    incidenciaArchivos: body.incidenciaArchivos,
  };
  // set user info
  return SolucionIncidencia;
}


// DELETE 

export const deleteIncidencia = (id) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/${id}`, '', 'DELETE');
    const body = await response.json();
    if (response.status === 200) {
      dispatch(getIncidencias(await loadIncidencias()));
      notification('Incidencia eliminado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar la incidencia', body.detalles, 'error');
    }
  };
};

// Refrescar la tabla

export const loadIncidencias = async (id) => {
  const response = await fetchToken('incidencias/personas/' + id);
  if (!response.ok) {
    throw new Error(response.status);
  }else{
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
  }else{
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
    dni: body.dni,
    oficina: body.oficina
  };

  return PersonasDni;

}

// 
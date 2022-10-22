import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getCorreoCredencial } from '../components/ui/correoCredencial/correoCredencial';

// CREATE CORREO CREDENCIAL

export const createCorreoCredencial = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `correo_credenciales`,
            {
                correo: data.correo,
                password: data.password,
            },
            'POST'
        );

        if (response.status === 200 || response.status === 201) {
            dispatch(getCorreoCredencial(await loadCorreoCredencial()));
            notification('CORREO CREDENCIAL CREADO', 'EL CORREO CREDENCIAL SE HA CREADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR DE CREACIÓN', 'NO SE LOGRÓ CREAR EL CORREO CREDENCIAL', 'error');
        }
    };
};

// LIST CORREOS CREDENCIALES

export const fetchListCorreoCredencial = async () => {
    try {
        const response = await fetchToken('correo_credenciales');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const CorreoCredencial = {};
            CorreoCredencial.data = data;
            return CorreoCredencial;
        }
    } catch (error) {
        // console.log(error);
    }
};

// export const fetchCorreoCredencial = async (id) => {
//     try {
//         const response = await fetchToken(`correo_credenciales/${id}`);
//         if (!response.ok) {
//             throw new Error(response.status);
//         } else {
//             const data = await response.json();
//             const CorreoCredencial = {};
//             CorreoCredencial.data = data;
//             return CorreoCredencial;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

//  UPDATE CORREO CREDENCIAL

export const updateCorreoCredencial = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `correo_credenciales`,
            {
                idCorreoCredenciales: data.idCorreoCredenciales,
                correo: data.correo,
                password: data.password,
                fecha: data.fecha,
                activo: data.activo,
            },
            'PUT'
        );

        if (response.status === 200) {
            dispatch(getCorreoCredencial(await loadCorreoCredencial()));
            notification('CORREO CREDENCIAL MODIFICADO', 'EL CORREO CREDENCIAL SE HA MODIFICADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR DE MODIFICACIÓN', 'NO SE LOGRÓ MODIFICAR EL CORREO CREDENCIAL', 'error');
        }
    };
};

//  DELETE CORREO CREDENCIAL

export const deleteCorreoCredencial = (id) => {
    return async dispatch => {
        const response = await fetchToken(`correo_credenciales/${id}`, '', 'DELETE');
        if (response.status === 200) {
            dispatch(getCorreoCredencial(await loadCorreoCredencial()));
            notification('CORREO CREDENCIAL ELIMINADO', 'CORREO CREDENCIAL SE HA ELIMINADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR AL ELIMINAR', 'NO SE LOGRÓ ELIMINAR EL CORREO CREDENCIAL', 'error');
        }
    };
};

// REFRESH DATA CORREO CREDENCIAL

export const loadCorreoCredencial = async () => {
    try {
        const response = await fetchToken('correo_credenciales');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const CorreoCredencial = {};
            CorreoCredencial.data = data;
            return CorreoCredencial;
        }
    } catch (error) {
        console.log(error);
    }
};

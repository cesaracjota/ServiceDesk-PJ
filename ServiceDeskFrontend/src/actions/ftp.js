import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getFtp } from '../components/ui/ftp/ftp';

// CREATE SEDE

export const createFtp = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `ftp`,
            {
                descripcion: data.descripcion,
                estado: data.estado,
                ip: data.ip,
                usuario: data.usuario,
                clave: data.clave,
            },
            'POST'
        );

        if (response.status === 200 || response.status === 201) {
            dispatch(getFtp(await loadFtp()));
            notification('Ftp registrado', 'Ftp se ha registrado correctamente.', 'success');
        } else {
            notification('Error de registro', 'No se pudo registrar el Ftp', 'error');
        }
    };
};

// LIST CARGO

export const fetchListFtp = async () => {
    try {
        const response = await fetchToken('ftp/listAll');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Ftp = {};
            Ftp.data = data;
            return Ftp;
        }
    } catch (error) {
        // console.log(error);
    }
};

export const fetchFtp = async (id) => {
    try {
        const response = await fetchToken(`ftp/${id}`);
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Ftp = {};
            Ftp.data = data;
            return Ftp;
        }
    } catch (error) {
        // console.log(error);
    }
};

//  UPDATE SEDE

export const updateFtp = (data) => {
    return async dispatch => {
        const response = await fetchToken(
            `ftp`,
            {
                id: data.id,
                descripcion: data.descripcion,
                estado: data.estado,
                ip: data.ip,
                usuario: data.usuario,
                clave: data.clave,
            },
            'PUT'
        );

        if (response.status === 200) {
            dispatch(getFtp(await loadFtp()));
            notification('Ftp actualizado', 'Ftp se ha actualizado correctamente', 'success');
        } else {
            notification('Error de actualización', 'No se pudo actualizar el Ftp', 'error');
        }
    };
};

//  DELETE / DISABLED SEDE

export const deleteFtp = (id) => {
    return async dispatch => {
        const response = await fetchToken(`ftp/${id}`, '', 'DELETE');

        if (response.status === 200) {
            dispatch(getFtp(await loadFtp()));
            notification('Ftp modificado', 'Ftp se ha actualizado su estado correctamente', 'success');
        } else {
            notification('Error de actualización', 'No se pudo eliminar el Ftp', 'error');
        }
    };
};

// Refrescar la tabla

export const loadFtp = async () => {
    try {
        const response = await fetchToken('ftp/listAll');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const data = await response.json();
            const Ftp = {};
            Ftp.data = data;
            return Ftp;
        }
    } catch (error) {
        console.log(error);
    }
};

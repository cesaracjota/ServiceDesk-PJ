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
            notification('FTP CREADA', 'FTP CREADA CORRECTAMENTE', 'success');
        } else {
            notification('ERROR DE CREACIÓN', 'NO SE LOGRÓ REGISTRAR EL FTP', 'error');
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
            notification('FTP MOFICADO', 'EL FTP SE HA MODIFICADO CORRECTAMENTE', 'success');
        } else {
            notification('ERROR DE MODIFICACIÓN', 'NO SE LOGRÓ MODIFICAR EL FTP', 'error');
        }
    };
};

//  DELETE / DISABLED SEDE

export const deleteFtp = (id) => {
    return async dispatch => {
        const response = await fetchToken(`ftp/${id}`, '', 'DELETE');

        if (response.status === 200) {
            dispatch(getFtp(await loadFtp()));
            notification('FTP MOFICADO', 'SE HA MODIFICADO EL ESTADO DEL FTP CORRECTAMENTE', 'success');
        } else {
            notification('ERROR AL MODIFICAR', 'NO SE LOGRÓ MODIFICAR EL ESTADO DEL FTP', 'error');
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

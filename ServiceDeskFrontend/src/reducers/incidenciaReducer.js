import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const misIncidenciasReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedMisIncidencias:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}

export const incidenciaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidencia:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}

export const incidenciaIdReducer = ( state =  initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidenciaId:
            return {
                ...state,                
                 rows: [...action.payload.data],
                 checking: false,
            }

        default:
            return state;
    }
}

export const incidenciasAsignadasReducer = ( state =  initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidenciasAsignadas:
            return {
                ...state,                
                 rows: [...action.payload.data],
                 checking: false,
            }

        default:
            return state;
    }

}

export const incidenciasNoAsignadasReducer = ( state =  initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidenciasNoAsignadas:
            return {
                ...state,                
                 rows: [...action.payload.data],
                 checking: false,
            }

        default:
            return state;
    }

}

export const incidenciasAsignadasSoporteReducer = ( state =  initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedIncidenciasAsignadasSoporte:
            return {
                ...state,                
                 rows: [...action.payload.data],
                 checking: false,
            }

        default:
            return state;
    }
}
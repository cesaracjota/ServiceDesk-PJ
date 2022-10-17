import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const correoRecibidoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedCorreoRecibido:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}

export const correoEnviadoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedCorreoEnviado:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
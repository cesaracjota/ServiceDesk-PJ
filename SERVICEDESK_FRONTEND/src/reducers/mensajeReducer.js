import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const mensajeReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedMensajes:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
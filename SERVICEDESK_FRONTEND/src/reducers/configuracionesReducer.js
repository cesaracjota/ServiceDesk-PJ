import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const configuracionBotonesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedConfigurarBotones:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
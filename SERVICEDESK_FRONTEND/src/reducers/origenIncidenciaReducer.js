import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const origenIncidenciaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedOrigenIncidencia:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
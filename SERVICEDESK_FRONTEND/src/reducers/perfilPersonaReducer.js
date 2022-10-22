import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const perfilPersonaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedPerfil:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
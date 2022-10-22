import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true
}

export const personaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedPersona:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
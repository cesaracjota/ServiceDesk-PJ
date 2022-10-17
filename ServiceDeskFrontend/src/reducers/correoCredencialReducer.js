import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const correoCredencialReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedCorreoCredencial:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
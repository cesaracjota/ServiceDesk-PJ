import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const motivoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedMotivo:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const oficinaReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedOficina:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
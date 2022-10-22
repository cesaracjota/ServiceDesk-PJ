import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const sedeReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedSede:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
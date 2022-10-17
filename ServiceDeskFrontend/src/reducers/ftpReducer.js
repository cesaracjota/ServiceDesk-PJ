import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const ftpReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedFtp:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
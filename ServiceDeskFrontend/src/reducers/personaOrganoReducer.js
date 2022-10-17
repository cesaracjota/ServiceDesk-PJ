import { types } from "../types/types";

const initialState = {
    rows: [],
    checking: true  
}

export const personaOrganoReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedPersonaOrgano:
            return {
                ...state,                
                rows: [...action.payload.data],
                checking: false,
            }

        default:
            return state;
    }

}
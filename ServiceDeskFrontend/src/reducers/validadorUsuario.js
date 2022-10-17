import { types } from "../types/types";

const initialState = {
}

export const validadorUsuarioReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.eventLoadedUsuarioValidadorDni:
            return {
                ...state,                
                ...action.payload
            }

        default:
            return state;
    }

}
import * as ActionType from "../ActionType"

const initalstate = {
    isLoading: false,
    medicine: [],
    error: ''

}

export const medicineReducer = (state = initalstate, action) => {
    console.log(action.type, action.payload, state);
    switch (action.type) {
        case ActionType.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        case ActionType.GET_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ''
            }
        case ActionType.POST_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.filter((l) => l.id !== action.payload),
                error: ''
            }
        case ActionType.UPADATE_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.map((l) => {
                    if (l.id === action.payload.id) {
                        return action.payload
                    } else {
                        return l
                    }
                }),
                error: ''
            }
        case ActionType.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: [],
                error: action.payload
            }
        default:
            return state
    }

}
import { combineReducers } from "redux";
import { medicineReducer } from "./medicine.reducer";

export const rootReducer = combineReducers({
    medicine : medicineReducer
})
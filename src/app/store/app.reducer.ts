import { ActionReducerMap } from "@ngrx/store";
import * as fromEmployeeList from "../store/employee.reducer";

export interface AppState {
    employeeList: fromEmployeeList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    employeeList: fromEmployeeList.reducer
}
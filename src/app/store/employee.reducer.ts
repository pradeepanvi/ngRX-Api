import { Employee } from "../shared/employee.model";
import * as EmployeeActions from "../store/employee.actions";

export const intialState: Employee = {
    name: "Hello",
    age: 90,
    salary: 25000
}

export function reducer(state: Employee[] = [intialState], action: EmployeeActions.Actions) {
    switch (action.type) {
        case EmployeeActions.ADD_EMPLOYEE:
            return [...state, action.payload];
        case EmployeeActions.UPDATE_EMPLOYEE:
            return [...state, action.payload];

        default:
            return state;
    }
}
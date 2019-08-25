import { Employee } from "../shared/employee.model";
import * as EmployeeActions from "../store/employee.actions";

export interface State {
    employees: Employee[];
    editedEmployee: Employee;
    editedEmployeeIndex: number;
}

const intialState: State = {
    employees: [new Employee('hello', 5, 2500), new Employee('hello 2', 10, 2500)],
    editedEmployee: null,
    editedEmployeeIndex: -1
}

export function reducer(state: State = intialState, action: EmployeeActions.Actions) {
    switch (action.type) {
        case EmployeeActions.ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };
        case EmployeeActions.UPDATE_EMPLOYEE:
            const employee = state.employees[state.editedEmployeeIndex];
            const updateEmployee = {
                ...employee,
                ...action.payload
            }
            const updateEmployees = [...state.employees];
            updateEmployees[state.editedEmployeeIndex] = updateEmployee;
            return {
                ...state,
                employees: updateEmployees,
                editedEmployeeIndex: -1,
                editedEmployee: null
            };
        case EmployeeActions.DELETE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter((ig, igIndex) => {
                    return igIndex !== state.editedEmployeeIndex;
                }),
                editedEmployeeIndex: -1,
                editedEmployee: null
            }
        case EmployeeActions.START_EDIT:
            return {
                ...state,
                editedEmployeeIndex: action.payload,
                editedEmployee: { ...state.employees[action.payload] }
            };
        case EmployeeActions.STOP_EDIT:
            return {
                ...state,
                editedEmployee: null,
                editedEmployeeIndex: -1
            }
        default:
            return state;
    }
}
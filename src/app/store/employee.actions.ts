import { Action } from "@ngrx/store";
import { Employee } from "../shared/employee.model";

export const ADD_EMPLOYEE = "[EMPLOYEE] Add";
export const EDIT_EMPLOYEE = "[EMPLOYEE] Edit";
export const UPDATE_EMPLOYEE = "[EMPLOYEE] Update";
export const DELETE_EMPLOYEE = "[EMPLOYEE] Delelte";
export const START_EDIT = "START_EDIT";
export const STOP_EDIT = "STOP_EDIT";

export class AddEmployee implements Action {
    readonly type = ADD_EMPLOYEE;
    constructor(public payload: Employee) { }
}

export class EditEmloyee implements Action {
    readonly type = EDIT_EMPLOYEE;
    constructor(public payload: { index: number, employee: Employee }) { }
}

export class UpdateEmployee implements Action {
    readonly type = UPDATE_EMPLOYEE;
    constructor(public payload: { index: number, employee: Employee }) { }
}

export class DeleteEmployee implements Action {
    readonly type = DELETE_EMPLOYEE;
    constructor(public payload: number) { }
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type Actions = AddEmployee | EditEmloyee | UpdateEmployee | DeleteEmployee | StartEdit | StopEdit;
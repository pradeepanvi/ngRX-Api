import { Employee } from "../shared/employee.model";

export interface AppState {
    readonly employee: Employee[];
}
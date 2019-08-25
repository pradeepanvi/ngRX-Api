import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Store } from "@ngrx/store";
import * as EmployeeActions from "../store/employee.actions";
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';
import { Employee } from '../shared/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  subscription: Subscription;
  id: number;

  constructor(
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    )
    this.subscription = this.store.select('employeeList').subscribe(
      (res) => {
        this.employee = res.editedEmployee;
      }
    )
  }

  edit() {
    this.router.navigate(['/edit/' + this.id], { relativeTo: this.route });
    this.store.dispatch(new EmployeeActions.StartEdit(this.id));
  }
  delete() {
    this.store.dispatch(new EmployeeActions.StartEdit(this.id));
    this.store.dispatch(new EmployeeActions.DeleteEmployee(this.id));
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}

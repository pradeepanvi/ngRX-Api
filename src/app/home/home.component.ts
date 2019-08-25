import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { Store } from '@ngrx/store';

import * as EmployeeActions from "../store/employee.actions";
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deleteEmployee: any;

  employees: Observable<{ employees: Employee[] }>;

  constructor(
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.employees = this.store.select("employeeList");
  }

  view(id) {
    this.router.navigate(['/employee/' + id], { relativeTo: this.route });
    this.store.dispatch(new EmployeeActions.StartEdit(id));
  }
  edit(id) {
    this.router.navigate(['/edit/' + id], { relativeTo: this.route });
    this.store.dispatch(new EmployeeActions.StartEdit(id));
  }
  delete(id) {
    this.store.dispatch(new EmployeeActions.StartEdit(id));
    this.store.dispatch(new EmployeeActions.DeleteEmployee(id))
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  getAllEmployees: any;
  getEmployee: any;
  createEmploye: any;
  updateEmployee: any;
  deleteEmployee: any;

  employees: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) {
    this.employees = store.select("employee");
  }

  ngOnInit() {
    this._employeeService.getAllEmployees()
      .subscribe(response => {
        this.getAllEmployees = response;
      });
  }

  view(id) {
    this.router.navigate(['/employee/' + id], { relativeTo: this.route })
  }
  edit(id) {
    this.router.navigate(['/edit/' + id], { relativeTo: this.route })
  }
  delete(id) {
    this._employeeService.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

}

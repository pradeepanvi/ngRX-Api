import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import * as EmployeeActions from "../store/employee.actions";
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employeeForm: FormGroup;
  editMode: boolean;
  id: number;
  employee: Observable<Employee[]>

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) {
    this.employee = store.select('employee');
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        this.initForm();
      }
    )
  }

  onSubmit() {
    let value = this.employeeForm.value;
    if (this.editMode) {
      this.store.dispatch(new EmployeeActions.UpdateEmployee(value));
    } else {
      this.store.dispatch(new EmployeeActions.AddEmployee(value));
    }
    // this.router.navigate(['/'], { relativeTo: this.route });
  }

  private initForm() {
    if (this.editMode) {
      let formValue;
      this.employee.subscribe(
        (res) => {
          formValue = res[this.id];
          this.employeeForm = this.fb.group({
            name: [formValue.name, [Validators.required]],
            age: [formValue.age, [Validators.required]],
            salary: [formValue.salary, [Validators.required]]
          })
          console.log(formValue);
        }
      )
    } else {
      this.employeeForm = this.fb.group({
        name: ["", [Validators.required]],
        age: ["", [Validators.required]],
        salary: ["", [Validators.required]]
      })
    }
  }

}

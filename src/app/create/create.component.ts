import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from "@ngrx/store";
import * as EmployeeActions from "../store/employee.actions";
import * as fromApp from "../store/app.reducer";
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employeeForm: FormGroup;
  id: number;
  subscription: Subscription;
  editMode = false;
  editedItem: Employee;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {
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
    const newEmployee = new Employee(value.name, value.age, value.salary);
    if (this.editMode) {
      this.store.dispatch(new EmployeeActions.UpdateEmployee(value));
    } else {
      this.store.dispatch(new EmployeeActions.AddEmployee(value));
    }
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  private initForm() {
    if (this.editMode) {
      console.log('edit mode 1')
      this.subscription = this.store.select('employeeList').subscribe(
        (res) => {
          console.log(res);
          if (res.editedEmployeeIndex > -1) {
            this.editedItem = res.editedEmployee;
            this.employeeForm = this.fb.group({
              name: [this.editedItem.name],
              age: [this.editedItem.age],
              salary: [this.editedItem.salary]
            })
            console.log('edit mode');
          }
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

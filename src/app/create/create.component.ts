import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employeeForm: FormGroup;
  editMode: boolean;
  id: number;

  constructor(
    private fb: FormBuilder, 
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.id){
          this.id = params.id;
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        this.initForm();
      }
    )
  }

  onSubmit(){
    let value = this.employeeForm.value;
    if(this.editMode){
      console.log('due to 4200 will not work')
      // this._employeeService.updateEmployee(this.id, value).subscribe(
      //   (res) => {
      //     console.log(res);
      //   }
      // )
    } else {
      this._employeeService.createEmploye(value).subscribe(
        (res) => {
          console.log(res);
        }
      )
    }
  }

  private initForm(){
    if(this.editMode){
      let formValue;
      this._employeeService.getEmployee(this.id).subscribe(
        (res) => {
          formValue = res;
          this.employeeForm = this.fb.group({
            name: [formValue.employee_name, [Validators.required]],
            age: [formValue.employee_age, [Validators.required]],
            salary: [formValue.employee_salary, [Validators.required]]
          })
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee:any;

  constructor(
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this._employeeService.getEmployee(params.id).subscribe(
          (res) => {
            this.employee = res
          }
        )
      }
    )
  }

  edit(id){
    this.router.navigate(['/edit/'+id], {relativeTo: this.route})
  }
  delete(id){
    this._employeeService.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }  

}

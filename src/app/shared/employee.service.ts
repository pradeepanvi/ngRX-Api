import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = "http://dummy.restapiexample.com/api/v1/";
  id:number;
  private subject = new Subject<any>();

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get(this.apiUrl+"employees")
  }
  getEmployee(id){
    return this.http.get(this.apiUrl+"employee/"+id)
  }
  createEmploye(data){
    return this.http.post(this.apiUrl+"create", data)
  }
  updateEmployee(id, data){
    return this.http.patch(this.apiUrl+"update/"+id, data)
  }
  deleteEmployee(id){
    return this.http.delete(this.apiUrl+"delete/"+id)
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee, ServerData } from '../types/Employee';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {

  myForm: FormGroup; 
  constructor(public employeeService: EmployeeService) {
    this.myForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      hireDate: new FormControl(),
      birthDate: new FormControl()
    })
  }

  ngOnInit(): void {  }

  submit(): void{
    const employee: Employee = {...this.myForm.value};
    this.employeeService.postData(employee).subscribe();
    this.myForm.reset();
  }

}

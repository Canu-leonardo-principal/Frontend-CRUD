import { Component, OnInit } from '@angular/core';
import { Employee, ServerData } from '../types/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate'];

  data: ServerData | undefined;
  dataSource: Employee[] | undefined;

  constructor ( private employeeService: EmployeeService){
    this.loadData("http://localhost:8080/employees");
    this.dataSource = this.data?._embedded.employees;
  }

  loadData(url: string){
    this.employeeService.getData(url).subscribe(
      serverResponse => {
        this.data = serverResponse;
        this.dataSource = this.data?._embedded.employees;
      }
    )
  }

  ngOnInit(): void {}
}
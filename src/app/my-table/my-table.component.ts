import { Component, OnInit } from '@angular/core';
import { Employee, ServerData } from '../types/Employee';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  //ATTRIBUTI============================================================================================
  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate'];

  data: ServerData | undefined;
  dataSource: MatTableDataSource<Employee>;
  
  //CONSTRUCTOR==========================================================================================
  constructor ( private employeeService: EmployeeService){
    this.loadData("http://localhost:8080/employees");
    this.dataSource = new MatTableDataSource(this.data?._embedded.employees);
  }
  //=====================================================================================================

  //METHODS==============================================================================================
  loadData(url: string){
    this.employeeService.getData(url).subscribe(
      serverResponse => {
        this.data = serverResponse;
        this.dataSource.data = this.data?._embedded.employees;
      }
    )
  }
  //=====================================================================================================
  ngOnInit(): void {}
}
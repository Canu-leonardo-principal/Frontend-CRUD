import { Component } from '@angular/core';
import { Employee, ServerData } from '../types/Employee';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  
  
  data: ServerData | undefined;
  dataSource: MatTableDataSource<Employee>;


  constructor ( private employeeService: EmployeeService){
    this.loadData("https://localhost:8080/employees");
    this.dataSource = new MatTableDataSource(this.data?._embedded.employees);
  }

  loadData(url: string){
    this.employeeService.getData(url).subscribe(
      serverRespons => {
        this.data = serverRespons;
        this.dataSource.data = this.data?._embedded.employees;
      }
    )
  }
}

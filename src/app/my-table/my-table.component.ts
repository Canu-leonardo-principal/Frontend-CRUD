import { Component, OnInit } from '@angular/core';
import { Employee, ServerData } from '../types/Employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  //ATTRIBUTI============================================================================================
  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate'];
  data: ServerData | undefined;
  Employees: any;

  FirstPageUrl: any;
  PrevPageUrl:  any;
  NextPageUrl:  any;
  LastPageUrl:  any;
  CurrPageURL:  any;

  CurrentPage: any;
  NumPages: any;
  //=====================================================================================================
  //CONSTRUCTOR==========================================================================================
  constructor ( public employeeService: EmployeeService){
    this.loadData("http://localhost:8080/employees");
    this.Employees = this.data?._embedded.employees;
  }
  //=====================================================================================================
  //METHODS==============================================================================================
  loadData(url: string){
    this.employeeService.getData(url).subscribe(
      serverResponse => {
        this.CurrPageURL = url;
        this.data = serverResponse;
        this.Employees = this.data._embedded.employees;
        
        this.CurrentPage = this.data.page.number;
        this.NumPages = this.data.page.totalPages - 1;
        
        if ( this.CurrentPage !== this.NumPages){  this.LastPageUrl  = this.data._links.last.href; }
          else { this.NextPageUrl = "http://localhost:8080/employees"; }
        if ( this.CurrentPage !== this.NumPages){  this.NextPageUrl  = this.data._links.next.href;  }
          else { this.NextPageUrl = "http://localhost:8080/employees"; }
        if ( this.CurrentPage !== 0 ){ this.PrevPageUrl  = this.data._links.prev.href }
          else { this.PrevPageUrl = "http://localhost:8080/employees"; }
        if ( this.CurrentPage !== 0 ){ this.FirstPageUrl = this.data._links.first.href; }
          else { this.PrevPageUrl = "http://localhost:8080/employees"; }          
        //this.CurrPageURL = this.data._links.self.href;
      }
    )
  }
  FirstPage() : void{
    this.loadData(this.FirstPageUrl);
  }
  PrevPage():void{
    this.loadData(this.PrevPageUrl);
  }
  NextPage() :void{
    this.loadData(this.NextPageUrl);
  }
  LastPage() : void{
    this.loadData(this.LastPageUrl);
  }
  RemoveData(Index: number) : void{  
    this.employeeService.removeData(Index).subscribe(()=>{
      this.loadData(this.CurrPageURL);      
    });
  }
  edit(employee: Employee):void{
    console.log(employee.firstName);
  }

  //=====================================================================================================
  ngOnInit(): void {}
}
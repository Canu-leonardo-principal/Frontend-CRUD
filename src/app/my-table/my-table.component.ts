import { Component, OnInit } from '@angular/core';
import { Employee, ServerData } from '../types/Employee';
import { EmployeeService } from '../services/employee.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  genders: any;
  myForm: FormGroup; 
  employee: Employee; 
  toEdit: boolean;
  //ATTRIBUTI============================================================================================
  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName', 'gender', 'hireDate'];
  data: ServerData | undefined;
  Employees: any;

  FirstPageUrl: any;
  PrevPageUrl :  any;
  NextPageUrl :  any;
  LastPageUrl :  any;
  CurrPageURL :  any;

  CurrentPage: any;
  NumPages: any;
  //=====================================================================================================
  //CONSTRUCTOR==========================================================================================
  constructor ( public employeeService: EmployeeService){
    this.toEdit = false;
    this.genders = [
      {id: "M", name: "Male"},
      {id: "F", name: "Female"}
    ]

    this.myForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      hireDate: new FormControl(),
      birthDate: new FormControl()
    });

    this.employee = {
      id: 0,
      birthDate: "" ,
      firstName: "",
      lastName: "",
      gender: "",
      hireDate: "",
    }

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
    this.employee = {...employee};
    this.toEdit = true;
    //console.log(employee.firstName);
  }

  //=====================================================================================================

  ngOnInit(): void {  }

  submit(): void{
    const employee: Employee = {...this.myForm.value};
    this.employeeService.postData(employee).subscribe(()=>{
      this.myForm.reset();
      this.loadData(this.CurrPageURL);   
    });
  }

  changeMode(): void{
    this.myForm.reset();
    this.toEdit = false;   
  }

  submitEdit(): void{
    this.employeeService.putData(this.employee).subscribe(()=>{
      this.myForm.reset();
      this.loadData(this.CurrPageURL);   
      this.toEdit = false;   
    });   
  }

}
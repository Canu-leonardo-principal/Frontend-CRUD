import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee, ServerData } from '../types/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor( private http: HttpClient) {  }

  getData(url: string, pageNum?: number, size?: number): Observable<ServerData>{
    const params = new  HttpParams().set('page', pageNum || 0).set('size', size || 10);
    return this.http.get<ServerData>(url, {params: params});
  }
  removeData(Index : number) {
    const url : string = "http://localhost:8080/employees/" + Index;
    //console.log(url);
    return this.http.delete(url);
  }

  postData(employee: Employee): Observable<ServerData>{
    return this.http.post<ServerData>("http://localhost:8080/employees", employee);
  }
}
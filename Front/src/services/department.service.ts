import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
    providedIn: 'root'
})

export class DepartmentService {


    constructor(private httpClient: HttpClient) {}

    // Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentSession') || '{}' ).token
        }),
    };

    async getDepartments(): Promise<any> {
        return this.httpClient.get<any>(`${environment.urlApi}department`, this.httpOptions).toPromise();
    }

    async create(department: Department): Promise<any> {
        return this.httpClient.post<any>(`${environment.urlApi}department/create`, department, this.httpOptions).toPromise();
    }

    async update(id: number, department: any): Promise<any> {
        return this.httpClient.put<any>(`${environment.urlApi}department/update/${id}`, department ,this.httpOptions).toPromise();
    }

    async delete(id: number): Promise<any> {
        return this.httpClient.delete<any>(`${environment.urlApi}department/delete/${id}`, this.httpOptions).toPromise();
    }

}

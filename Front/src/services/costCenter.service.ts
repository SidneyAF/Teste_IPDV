import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CostCenter } from '../models/costCenter.model';

@Injectable({
    providedIn: 'root'
})

export class CostCenterService {


    constructor(private httpClient: HttpClient) {}

    // Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentSession') || '{}' ).token
        }),
    };

    async getCostCenter(): Promise<any> {
        return this.httpClient.get<any>(`${environment.urlApi}costCenter`, this.httpOptions).toPromise();
    }

    async create(costCenter: CostCenter): Promise<any> {
        return this.httpClient.post<any>(`${environment.urlApi}costCenter/create`, costCenter, this.httpOptions).toPromise();
    }

    async update(id: number, costCenter: any): Promise<any> {
        return this.httpClient.put<any>(`${environment.urlApi}costCenter/update/${id}`, costCenter, this.httpOptions).toPromise();
    }

    async delete(id: number): Promise<any> {
        return this.httpClient.delete<any>(`${environment.urlApi}costCenter/delete/${id}`, this.httpOptions).toPromise();
    }

}

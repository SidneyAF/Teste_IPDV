import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {


    constructor(private httpClient: HttpClient) {}

    // Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentSession') || '{}' ).token
        }),
    };

    async getUsers(): Promise<any> {
        return this.httpClient.get<any>(`${environment.urlApi}user`, this.httpOptions).toPromise();
    }

    async create(user: User): Promise<any> {
        return this.httpClient.post<any>(`${environment.urlApi}user/create`, user, this.httpOptions).toPromise();
    }

    async update(id: number, user: any): Promise<any> {
        return this.httpClient.put<any>(`${environment.urlApi}user/update/${id}`, user, this.httpOptions).toPromise();
    }

    async delete(id: number): Promise<any> {
        return this.httpClient.delete<any>(`${environment.urlApi}user/delete/${id}`, this.httpOptions).toPromise();
    }

}

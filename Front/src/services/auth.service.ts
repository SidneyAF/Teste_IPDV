import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Session } from '../models/session.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public session = JSON.parse(localStorage.getItem('currentSession') || '{}')
    public currentSessionSubject = new BehaviorSubject(this.session);

    currentSession = this.currentSessionSubject.asObservable();

    constructor(private httpClient: HttpClient) {
    }

    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    async authenticate(name: string): Promise<any> {
        await this.httpClient.post<any>(`${environment.urlApi}auth`, {user: name} , this.httpOptions).toPromise().then(data => {
            localStorage.setItem('currentSession', JSON.stringify(data));
            this.currentSessionSubject.next(data);
            return data;
        });
    }

    public get currentSessionValue(): Session {
        return this.currentSessionSubject.value;
    }

    exit() {
        localStorage.removeItem('currentSession');
        this.currentSessionSubject.next({name: ''});
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProyectosService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) { }

    getProyectos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
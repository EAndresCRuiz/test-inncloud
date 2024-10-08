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

    createProyecto(proyecto: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, proyecto);
    }

    getProyectoById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateProyecto(id: number, proyecto: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, proyecto);
    }

    deleteProyecto(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
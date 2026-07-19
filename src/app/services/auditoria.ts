import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  private apiUrl = 'https://sistemainventario-backend-1.onrender.com/api/auditoria';

  constructor(private http: HttpClient) { }

  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
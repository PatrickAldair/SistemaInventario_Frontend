import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Producto {
  private apiUrl = 'https://sistemainventario-backend-m5g8.onrender.com/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  moverProducto(id: number, nuevaUbicacion: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/mover?nuevaUbicacion=${nuevaUbicacion}`, {});
  }

  corregirStock(id: number, nuevaCantidad: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/stock?nuevaCantidad=${nuevaCantidad}`, {});
  }
}
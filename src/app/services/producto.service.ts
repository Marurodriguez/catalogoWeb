import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiURL = "http://localhost:3000/productos";
  constructor(private http: HttpClient) { }

  getProductos():Observable<Producto[]>
  {
    return this.http.get<Producto[]>(this.apiURL);
  }

}

export interface Producto {
  codigo: string;
  nombre: string;
  detalle: string;
  rubro: string;
  marca: string;
  precio: string;
  presentacion: string;
  total: string;
  variacion: string;
  precio_sugerido: string;
}
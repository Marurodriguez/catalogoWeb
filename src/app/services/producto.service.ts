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

  agruparProductos(productos: Producto[]): { rubro: string, marca: string, productos: Producto[] }[] {
    const productosAgrupados: { rubro: string, marca: string, productos: Producto[] }[] = [];

    productos.sort((a, b) => {
      if (a.rubro === b.rubro) {
        return a.marca.localeCompare(b.marca);
      }
      return a.rubro.localeCompare(b.rubro);
    });

    let currentRubro: string | null = null;
    let currentMarca: string | null = null;

    productos.forEach(producto => {
      if (producto.rubro !== currentRubro || producto.marca !== currentMarca) {
        productosAgrupados.push({ rubro: producto.rubro, marca: producto.marca, productos: [] });
        currentRubro = producto.rubro;
        currentMarca = producto.marca;
      }
      productosAgrupados[productosAgrupados.length - 1].productos.push(producto);
    });

    return productosAgrupados;
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
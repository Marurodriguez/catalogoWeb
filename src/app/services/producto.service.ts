import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiURL = "http://localhost:3000/productos";

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
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

  exportarExcel(productos: Producto[]): void {
    const worksheetData = productos.map(producto => ({
      Código: producto.codigo,
      Nombre: producto.nombre,
      Detalle: producto.detalle,
      'Precio x kg/unidad': producto.precio,
      Presentación: producto.presentacion,
      Total: producto.total,
      Variación: producto.variacion,
      'Precio sugerido': producto.precio_sugerido
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Productos': worksheet }, SheetNames: ['Productos'] };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(excelData, 'listado_productos.xlsx');
  }

  buscarProductos(termino: string, productos: Producto[]): Producto[] {
    termino = termino.toLowerCase().trim();
    return productos.filter(producto =>
      producto.codigo.toLowerCase().includes(termino) || producto.nombre.toLowerCase().includes(termino)
    );
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

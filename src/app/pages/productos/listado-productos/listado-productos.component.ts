import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosAgrupados: { rubro: string; marca: string; productos: Producto[] }[] = [];
  busqueda: string = '';
  productosFiltrados: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.productosAgrupados = this.productoService.agruparProductos(this.productos);
      this.productosFiltrados = [...this.productos];
    });
  }

  exportarListado(): void {
    this.productoService.exportarExcel(this.productosFiltrados);
  }

  buscarProductos(): void {
    if (this.busqueda.trim() === '') {
      this.productosFiltrados = [...this.productos];
    } else {
      const busqueda = this.busqueda.toLowerCase();
      this.productosFiltrados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.codigo.toLowerCase().includes(busqueda)
      );
    }
  }

  hayProductosFiltrados(grupo: { rubro: string; marca: string; productos: Producto[] }): boolean {
    return this.productosFiltrados.some((producto) => grupo.productos.includes(producto));
  }
}
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {
  productos!: Producto[];
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos()
      .subscribe(productos => {
        this.productos = productos;
      });
  }


}
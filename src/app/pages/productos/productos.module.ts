import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';


@NgModule({
  declarations: [
    ListadoProductosComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent  ]
  ,
  imports: [
    CommonModule,
    ProductosRoutingModule
  ],
  exports: [
    ListadoProductosComponent
  ]
})
export class ProductosModule { }

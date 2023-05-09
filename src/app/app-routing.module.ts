import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListadoProductosComponent } from './pages/productos/listado-productos/listado-productos.component';
import { ProductosRoutingModule } from './pages/productos/productos-routing.module';

const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},

    {path:'login', component:LoginComponent},
    {path:'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)}

];

@NgModule({
  imports: [
    ProductosRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
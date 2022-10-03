import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/pages/home/home.component';
import { BuscarFacturaComponent } from './pages/buscar-factura/buscar-factura.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: 'buscarfactura', component: BuscarFacturaComponent, data:{titulo: 'Buscar Factura'}},
      {path: 'verdetalle', component: VerDetalleComponent, data:{titulo:'Hacer Factura'}},
      {path: '**', redirectTo: 'buscarfactura'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }

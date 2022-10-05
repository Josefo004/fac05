import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { BuscarFacturaComponent } from './pages/buscar-factura/buscar-factura.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';
import { FacturaComponent } from './pages/factura/factura.component';

@NgModule({
  declarations: [
    BuscarFacturaComponent,
    VerDetalleComponent,
    FacturaComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class FacturaModule { }

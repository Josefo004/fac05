import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GateRoutingModule } from './gate-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PermitirComponent } from './pages/permitir/permitir.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PrincipalComponent,
    ReporteComponent,
    PermitirComponent
  ],
  imports: [
    CommonModule,
    GateRoutingModule,
    SharedModule
  ]
})
export class GateModule { }

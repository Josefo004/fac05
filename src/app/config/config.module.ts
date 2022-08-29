import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { BuscarUsuarioComponent } from './pages/buscar-usuario/buscar-usuario.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    BuscarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/pages/home/home.component';
import { PermitirComponent } from './pages/permitir/permitir.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'principal', component: PrincipalComponent},
      {path: 'permitir', component: PermitirComponent},
      {path: 'reporte', component: ReporteComponent},
      {path: '**', redirectTo: 'principal'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GateRoutingModule { }

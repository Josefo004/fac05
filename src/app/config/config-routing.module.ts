import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/pages/home/home.component';
import { BuscarUsuarioComponent } from './pages/buscar-usuario/buscar-usuario.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'nuevoUsuario', component: NuevoUsuarioComponent},
      {path: 'buscarUsuario', component: BuscarUsuarioComponent},
      {path: '**', redirectTo: 'nuevoUsuario'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }

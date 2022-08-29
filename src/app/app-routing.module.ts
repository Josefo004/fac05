import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {path: 'gate', loadChildren: () => import('./gate/gate.module').then( m => m.GateModule)},
  {path: 'configurar', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

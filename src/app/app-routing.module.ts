import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {
    path: 'gate', loadChildren: () => import('./gate/gate.module').then( m => m.GateModule),
    canActivate: [AuthGuard],
    data: {permisions: {only:['LOG', 'ADMIN'], redirectTo: '/'}}
  },
  {
    path: 'configurar', loadChildren: () => import('./config/config.module').then(m => m.ConfigModule),
    canActivate: [AuthGuard],
    data: {permisions: {only:['LOG', 'ADMIN'], redirectTo: '/'}}
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

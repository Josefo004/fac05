import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {
    path: 'navegar', loadChildren: ()=>import('./navegar/navegar.module').then(m=>m.NavegarModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['LOG', 'ADMIN'], redirectTo: '/403'}
    }
  },
  {
    path: 'factura', loadChildren: ()=>import('./factura/factura.module').then(m=>m.FacturaModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['LOG', 'ADMIN'], redirectTo: '/403'}
    }
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

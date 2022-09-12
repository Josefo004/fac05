import { Injectable } from '@angular/core';
import { Tmenu } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  
//  private  _menu : Tmenu [] = [];

menu:Tmenu[]=[
  {
    titulo: 'Ingresos',
    icono: 'nav-icon fas fa-copy',
    url: '/gate',
    permisos: ['LOG'],
    submenu: [
      {titulo: 'Ingresos', icono: '', url:'/gate/principal', permisos: ['']},
      {titulo: 'Reporte', icono: '', url:'/gate/reporte', permisos: ['']}
    ]
  },
  {
    titulo: 'Configuración',
    icono: 'nav-icon fas fa-table',
    url: '/configurar',
    permisos: ['ADMIN'],
    submenu: [
      {titulo: 'Nuevo Usuario', icono: '', url:'/configurar/principal', permisos: ['']},
      {titulo: 'Buscar Usuario', icono: '', url:'/configurar/permitir', permisos: ['']}
    ]
  }
];

constructor() { }

  
}

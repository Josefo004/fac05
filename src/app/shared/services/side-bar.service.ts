import { Injectable } from '@angular/core';
import { Tmenu } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  
//  private  _menu : Tmenu [] = [];

menu:Tmenu[]=[
  {
    titulo: 'Factura',
    icono: 'nav-icon fas fa-copy',
    url: '/factura',
    permisos: ['LOG'],
    submenu: [
      {titulo: ' Nueva Factura', icono: 'fas fa-calculator', url:'/factura/factura', permisos: ['canDoFactura']},
      {titulo: ' Busqueda Factura', icono: 'fa fa-search-plus', url:'/factura/busquedaA', permisos: ['canFindFactura']}
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

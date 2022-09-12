import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PermisosService } from 'src/app/auth/services/permisos.service';
import { Tmenu } from 'src/app/interfaces/interfaces';
import { SideBarService } from '../../services/side-bar.service';

declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  menuItems:Tmenu[]=[];

  get auth(){
    return this.authService.auth;
  }

  constructor(private authService: AuthService,
              private router: Router,
              private sideBarService: SideBarService,
              private permisosService: PermisosService) { }

  ngOnInit(): void {
    this.menu();
    $('[data-widget="treeview"]').Treeview('init');
  }

  public menu(){
    this.menuItems = [];
    this.menuItems = this.sideBarService.menu;
  }
  
  logout(){
    this.permisosService.limpiar_permisos();
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

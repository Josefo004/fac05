import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SideBarService } from '../../services/side-bar.service';

declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  get auth(){
    return this.authService.auth;
  }

  get menuItems(){
    return this.sideBarService.menu;
  }

  constructor(private authService: AuthService,
              private router: Router,
              private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.sideBarService.loadMenu().subscribe();
    $('[data-widget="treeview"]').Treeview('init');
  }
  
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

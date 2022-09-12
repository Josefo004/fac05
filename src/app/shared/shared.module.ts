import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BreadCrumbsComponent } from './pages/bread-crumbs/bread-crumbs.component';
import { HomeComponent } from './pages/home/home.component';
import { InputComponent } from './pages/input/input.component';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    BreadCrumbsComponent,
    HomeComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPermissionsModule
  ],
  exports: [
    HomeComponent,
    InputComponent
  ]
})
export class SharedModule { }

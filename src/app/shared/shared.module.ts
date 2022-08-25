import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BreadCrumbsComponent } from './pages/bread-crumbs/bread-crumbs.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    BreadCrumbsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class SharedModule { }

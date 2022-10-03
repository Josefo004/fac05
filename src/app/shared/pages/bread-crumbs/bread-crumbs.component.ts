import { Component } from '@angular/core';
import { NavegarService } from 'src/app/navegar/services/navegar.service';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})
export class BreadCrumbsComponent {

  get titulo (){
    return this.navegarService.titulo;
  }

  constructor(private navegarService: NavegarService) { }

}

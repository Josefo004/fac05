import { Component, OnInit } from '@angular/core';
import { PersonasLocalService } from '../../services/personas-local.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  termino = '';

  constructor(private personasLocalService: PersonasLocalService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){
    this.personasLocalService.buscarPersona(termino)
      .subscribe(resp => console.log(resp));
  }

}

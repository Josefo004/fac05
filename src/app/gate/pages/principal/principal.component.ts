import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {

  termino = '';

  constructor() { }

  ngOnInit(): void {
  }

  buscar(termino: string){
    console.log(termino);
  }

  sugerencias(termino: string){
    console.log(termino);
    
  }

}

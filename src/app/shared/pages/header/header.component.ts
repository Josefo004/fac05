import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavegarService } from 'src/app/navegar/services/navegar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  get sucursalN(){
    return this.navegarService.sucursalN;
  }

  get puntoVentaN(){
    return this.navegarService.puntoVentaN;
  }

  constructor(private navegarService:NavegarService,
              private router: Router) { }

  ngOnInit(): void {
  }

  irAPuntosVenta(ids:string){
    //console.log(`./navegar/puntoventa/${ids}`);
    this.navegarService.limpiarP();
    this.router.navigate([`./navegar/puntoventa/${ids}`]);
  }

}

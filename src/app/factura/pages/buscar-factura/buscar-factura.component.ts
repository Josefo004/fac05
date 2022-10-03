import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TVenta } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { ImprimirService } from '../../services/imprimir.service';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-buscar-factura',
  templateUrl: './buscar-factura.component.html',
  styles: [
  ]
})
export class BuscarFacturaComponent implements OnInit {

  ventasItems: TVenta[]=[];

  get titulo (){
    return this.navegarService.titulo;
  }

  get usuario (){
    return this.authService.auth;
  }

  termino:string='';
  por:string[1]=''; //radio buton

  constructor(private navegarService: NavegarService,
              private ventasService: VentasService,
              private router: Router,
              private authService: AuthService,
              private imprimirService:ImprimirService ) { }

  ngOnInit(): void {
    this.ultimos15();
    this.por='1';
  }

  ultimos15(){
    this.ventasService.utimos15()
      .subscribe( vts => this.ventasItems = vts );
  }

  buscar(termino:string){
    this.termino = termino;
    this.ventasItems=[];
    if (this.termino.length>1){
      if (this.por === '1') {  
        this.ventasService.buscarPorDocumento(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
      else{
        this.ventasService.buscarPorRazonSocial(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
  }

  sugerencias(termino:string){
    this.termino = termino;
    this.ventasItems=[];
    if (this.por==='1') {
      if (this.termino.length>=3) {
        this.ventasService.buscarPorDocumento(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
    else{
      if (this.termino.length>=5) {
        this.ventasService.buscarPorRazonSocial(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
  }

  verdetalle(idV:number){
    console.log('ID VENTA FIND FACTURA',idV);
    this.ventasService.sidVenta(idV);
    this.imprimirService.para_imprimir(idV);
    this.router.navigate([`./factura/verdetalle`]);
  }

}

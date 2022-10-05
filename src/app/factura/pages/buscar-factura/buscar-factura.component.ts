import { ThisReceiver } from '@angular/compiler';
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
  unaVenta   : TVenta = {
    id: 0,
    razonSocial: '',
    fechHora: new Date(),
    monto: 0,
    nroDocumento: '',
    estado: false,
    puntoVentaId: 0,
    id_usuario:0,
    borrado:false
  }; 
  displayStyle = "none";

  get titulo (){
    return this.navegarService.titulo;
  }

  get usuario (){
    return this.authService.auth;
  }

  termino:string='';
  placeholder:string='';
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
    this.por='1';
    this.miplaceholder('1');
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

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  seleccionar_borrar(idV:number){
    this.ventasService.buscarUnaVenta(idV)
      .subscribe(resp => {
        this.unaVenta = resp;
        this.openPopup();
      });
  }

  borrar_factura(){
    this.unaVenta.borrado = true;
    this.ventasService.eliminarVenta(this.unaVenta)
    .subscribe(resp => {
      console.log('VENTA BORRADA',resp);
      this.closePopup();
      this.ultimos15();
    });
  }

  miplaceholder(ppp:string){
    this.termino='';
    this.por = ppp;
    if (this.por=='1') this.placeholder='Buscar Nro Documento ...'
    else this.placeholder='Buscar Razon Social ...';
  }

}

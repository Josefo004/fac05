import { Component, OnInit } from '@angular/core';
import { TRazonSocial } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { RazonSocialService } from '../../services/razon-social.service';
import { TProducto } from '../../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
    `
    ul{
      padding-top: 5px;
    }
    li{
      padding: 0px 0px 3px 0px;
      cursor: pointer;
    }
    app-input {
      padding: 0px;
    }
    `
  ]
})
export class FacturaComponent implements OnInit {

  dRazonSocial = 'none';
  productosSel : TProducto[] = [];
  productoSel  : TProducto = {
    id: 0,
    producto: '',
    unidad: '',
    precioMinimo: 0,
    precioMaximo: 0,
    sucursalId: 0,
    puntoVentaId: 0
  }

  razonSocial : TRazonSocial={
    id:0,
    razonSocial:'',
    nroDocumento:'',
    tipoDoc:''
  };
  termino:string='';
  placeholder:string  = 'Nro documento ...';
  placeholder2:string = 'Producto Buscado ...';

  get titulo (){
    return this.navegarService.titulo;
  }

  
  constructor(private razonSocialService: RazonSocialService,
              private navegarService: NavegarService,
              private produtoService: ProductosService) { }
    
  ngOnInit(): void {
    this.dRazonSocial='none';
  }
  
  buscarRazonSocial(termino:string){
    this.termino = termino;
    this.razonSocialService.buscarRazon(this.termino)
      .subscribe(resp=>{
        if (resp.length>0) {
          this.razonSocial=resp[0]
        } 
        else{
          this.iniciarRazonSocial('', '', '');
          this.popup(1);
        }
      });
  }

  iniciarRazonSocial(rs:string, nd:string, td:string){
    this.razonSocial={
      id          :0,
      nroDocumento:nd,
      razonSocial :rs,
      tipoDoc     :td
    }
  }
  
  guardar_RS(){
    const newRazon : TRazonSocial={
      razonSocial:  this.razonSocial.razonSocial.toUpperCase().trim(),
      nroDocumento: this.razonSocial.nroDocumento.toUpperCase().trim(),
      tipoDoc:      this.razonSocial.tipoDoc.toUpperCase().trim()
    };

    if (newRazon.nroDocumento.length>0&&newRazon.nroDocumento.length>3&&newRazon.tipoDoc.length>0) {
      this.razonSocialService.guardarRazon(newRazon)
        .subscribe(resp=>{
          this.razonSocial=resp;
          this.popup(1);
        });
    }
  }

  popup(idmodal:number){
    switch (idmodal) {
      case 1:
        this.dRazonSocial = (this.dRazonSocial=='none')?'block':'none';
        break;
    }
  }

  buscarProducto(termino:string){
    if (termino.length>2) {
      this.produtoService.productosPorPVenta(termino)
        .subscribe(resp => {
          this.productosSel = resp;
        });
    }
    else{
      this.productosSel = [];
    }
  }

  sugerencias(termino:string){
    if (termino.length>2) {
      this.productosSel = [];
      this.produtoService.productosPorPVenta(termino)
        .subscribe(resp => {
          this.productosSel = resp;
        });
    }
    else{
      this.productosSel = [];
    }
  }

  agregar(){}

}

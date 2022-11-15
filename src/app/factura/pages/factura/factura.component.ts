import { Component, OnInit } from '@angular/core';
import { TProductoAV, TProductoV, TRazonSocial, TVenta } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { RazonSocialService } from '../../services/razon-social.service';
import { TProducto } from '../../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { ImprimirService } from '../../services/imprimir.service';
import { Router } from '@angular/router';
import { Utils } from '../../services/utils.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
    `
    ul{
      padding-top: 5px;
    }
    li{
      padding: 3px 3px 3px 3px;
      cursor: pointer;
    }
    app-input {
      padding: 0px;
    }
    `
  ]
})
export class FacturaComponent implements OnInit {

  dRazonSocial   = 'none';
  dImprimir      = 'none';
  dError         = 'none';
  productosSel   : TProducto[] = [];
  productosVende : TProductoV[] = [];
  totalV         : number = 0;
  qrValue        : string = '';
  facturar       : boolean = true;
  ventaSave!     : TVenta;
  aviso          : string[] = [];

  productoSel  : TProducto = {
    id: 0,
    producto: '',
    unidad: '',
    precioMinimo: 0,
    precioMaximo: 0,
    sucursalId: 0,
    puntoVentaId: 0
  }

  productoAv   :TProductoAV = {
    producto:'',
    unidad:'',
    precioUnitario:0,
    cantidad:0
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
  placeholder3:string = 'Cantidad ...';
  cancelar:boolean = false;
  

  get titulo (){
    return this.navegarService.titulo;
  }

  
  constructor(private razonSocialService: RazonSocialService,
              private navegarService: NavegarService,
              private produtoService: ProductosService,
              private ventasService: VentasService,
              private authService: AuthService,
              private detalleVentaService: DetalleVentaService,
              private imprimirService: ImprimirService,
              private router: Router,
              private utils: Utils) { }
    
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
      case 2:
        this.dImprimir = (this.dImprimir=='none')?'block':'none';
        break;
      case 3:
        this.dError = (this.dError=='none')?'block':'none';
        break;
    }
  }

  buscarProducto(termino:string){
    if (termino.length>2) {
      this.produtoService.productosPorPVenta(termino)
        .subscribe(resp => {
          this.productosSel = resp;
          if (this.productosSel.length==1) {
            this.seleccionarProducto(0);
          }
        });
    }
    else{
      this.productosSel = [];
    }
  }

  sugerencias(termino:string){
    if (termino.length>2) {
      this.productosSel = [];
      //this.iniciarproductoAV();
      this.produtoService.productosPorPVenta(termino)
        .subscribe(resp => {
          this.productosSel = resp;
        });
    }
    else{
      this.productosSel = [];
    }
  }

  iniciarproductoAV(){
    this.productoAv = {
      producto:'',
      unidad:'',
      precioUnitario:0,
      cantidad:0
    }
  }

  iniciarproductoSel(){
    this.productoSel = {
      id: 0,
      producto: '',
      unidad: '',
      precioMinimo: 0,
      precioMaximo: 0,
      sucursalId: 0,
      puntoVentaId: 0
    }
  }

  seleccionarProducto(i:number){
   this.productoSel = this.productosSel[i];
   console.log(this.productoSel);
   this.productoAv.producto = this.productoSel.producto;
   this.productoAv.unidad = this.productoSel.unidad;
   this.productoAv.precioUnitario = this.productoSel.precioMinimo;
   this.productosSel = []; 
   this.cancelar=true;  
  }

  cancelarPaV(){ //cancelar producto a vender
    this.productosSel = [];
    this.iniciarproductoAV();
    this.iniciarproductoSel();
    this.cancelar=false;
  }

  validar(psav:TProductoV, psel:TProducto){ //psav=producto seleccionado a vender | psel=producto selecionado
    this.aviso = [];
    if (psel.id>0) {
      (psav.precioUnitario>=psel.precioMinimo && psav.precioUnitario<=psel.precioMaximo)
        ?''
        :this.aviso.push('EL PRECIO DEBE ESTAR EN EL DE RANGO DE Bs.'+psel.precioMinimo+' Y Bs.'+psel.precioMaximo);
      (psav.cantidad>0)?'':this.aviso.push('LACANTIDAD A VENDER DEBE SER MAYOR A CERO');
      let k = this.productosVende.length;
      for (let i = 0; i < k; i++) {
        if(this.productosVende[i].producto === psel.producto && this.productosVende[i].unidad === psel.unidad){
          this.aviso.push('EL PRODUCTO YA ESTA EN LISTA DE COMPRAS');
          break;
        }
      }
    }
    else{ 
      this.aviso.push('ERROR!! DEBE SELECCIONAR UN PRODUCTO');
    }

    
  }

  agregar(){
    let unProducto: TProductoV = {
      producto       : this.productoSel.producto,
      unidad         : this.productoSel.unidad,
      precioUnitario : this.productoAv.precioUnitario,
      cantidad       : this.productoAv.cantidad,
      sucursalId     : this.productoSel.sucursalId,
      puntoVentaId   : this.productoSel.puntoVentaId,
      ventaId        : 0
    }
    this.validar(unProducto, this.productoSel); 
    if (this.aviso.length==0){
      this.productosVende.push(unProducto);
      this.totalProductos();
      console.log('nuevo producto ',this.productosVende);
      this.cancelarPaV();
    }
    else{
      this.popup(3);
    }
  }

  totalProductos(){
    let k = this.productosVende.length;
    this.totalV = 0;
    for (let i = 0; i < k; i++) {
      this.totalV+=this.productosVende[i].cantidad*this.productosVende[i].precioUnitario;
    }
  }

  quitar(i:number){
    console.log('QUITAR',i);
    this.productosVende.splice(i,1);
    console.log(this.productosVende);
    this.totalProductos();
  }

  guardarVenta(){
    let ventaNueva: TVenta = {
      id          : 0,
      razonSocial : this.razonSocial.razonSocial,
      fechHora    : new Date(),
      monto       : this.totalV,
      nroDocumento: this.razonSocial.nroDocumento,
      estado      : this.facturar,
      puntoVentaId: parseInt(this.navegarService.puntoVentaN[0],10),
      id_usuario  : this.authService.auth.id || 0,
      borrado     : false
    }

    this.ventasService.guardarVenta(ventaNueva)
      .subscribe(resp => {
        this.ventaSave = resp;
        console.log(resp);
        let k = this.productosVende.length;
        for (let i = 0; i < k; i++) {
          this.productosVende[i].ventaId = this.ventaSave.id;
          this.detalleVentaService.guardarUnDetalle(this.productosVende[i])
            .subscribe(resp => console.log('DETALLE VENDIDO', resp));
        }
        this.imprimirService.para_imprimir(this.ventaSave.id);
        this.popup(2);
        //this.router.navigate([`./factura`]);
      });

  }

  //validar solo numeros enteros en cantidad
  solo_numeros(evt:any, tipoN:string='1'){
    
    // code codigo deci,al de la tecla precionanda.
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (tipoN=='1') { //para numeros eneros
      if(code==8) { // backspace.
        return true;
      } else if(code>=48 && code<=57) { // es un numero
        return true;
      } else{ // otras teclas
        return false;
      }
    } else { //para numeros con punto decimal
      if(code == 8 || code == 46) { // backspace.
        return true;
      } else if(code>=48 && code<=57) { // es un numero
        return true;
      } else{ // otras teclas
        return false;
      }
    }
  }

  imprimirt(){
    this.imprimirService.imprimir_Ticket();
    this.router.navigate([`./factura`]);
  }

  imprimir2(){
    this.imprimirService.imprimir_Carta();
    this.router.navigate([`./factura`]);
  }
}

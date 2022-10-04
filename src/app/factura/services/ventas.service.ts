import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { TVenta } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl     : string = environment.apiUrl;
  private _idVenta   : number = 1;

  get puntoVenta(){
    return this.navegarService.puntoVentaN;
  }

  get idVenta(){
    return this._idVenta;
  }

  sidVenta(x:number){
    this._idVenta = x;
  }

  constructor(private http: HttpClient,
              private navegarService: NavegarService) { }
  
  //ultimas 15 ventas
  utimos15(){
    const urlVentas = `${this.apiUrl}/ventas?puntoVentaId=${this.puntoVenta[0]}&_sort=id&_order=desc&_limit=15`;
    console.log(urlVentas);
    return this.http.get<TVenta[]>(urlVentas);
  }

  //ventas por No de documen to
  buscarPorDocumento(nd:string){
    const urlVentas = `${this.apiUrl}/ventas?nroDocumento_like=${nd}&puntoVentaId=${this.puntoVenta[0]}&_sort=id&_order=desc`;
    console.log(urlVentas);
    return this.http.get<TVenta[]>(urlVentas);
  }

  //Ventas por razon social
  buscarPorRazonSocial(rs:string){
    const urlVentas = `${this.apiUrl}/ventas?razonSocial_like=${rs}&puntoVentaId=${this.puntoVenta[0]}&_sort=id&_order=desc`;
    console.log(urlVentas);
    return this.http.get<TVenta[]>(urlVentas);
  }

  //buscar una venta por IDventa
  buscarUnaVenta(idV: number){
    const urlVentas = `${this.apiUrl}/ventas/${idV}`;
    console.log(urlVentas);
    return this.http.get<TVenta>(urlVentas);
  }

  //GuardarVenta
  guardarVenta(bo:{}){
    const urlVentas = `${this.apiUrl}/ventas`;
    return this.http.post<TVenta>(urlVentas,bo,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  //eliminar una venta
  eliminarVenta(venta:TVenta){
    const urlVentas = `${this.apiUrl}/ventas/${venta.id}`;
    return this.http.put<TVenta>(urlVentas, venta,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { TProducto } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl     : string = environment.apiUrl;

  get puntoVenta(){
    return this.navegarService.puntoVentaN;
  }

  constructor(private http: HttpClient,
              private navegarService: NavegarService) { }

  productosPorPVenta(term:string){
    const urlProductos = `${this.apiUrl}/productos?producto_like=${term}&puntoVentaId=${this.puntoVenta[0]}`;
    return this.http.get<TProducto[]>(urlProductos);
  }

  unSoloProducto(idP:number){
    const urlProductos = `${this.apiUrl}/productos/${idP}`;
    return this.http.get<TProducto>(urlProductos);
  }

}

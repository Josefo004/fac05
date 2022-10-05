import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRazonSocial } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RazonSocialService {

  private apiUrl : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  buscarRazon(nroDoc:string){
    const urlRazonSocial = `${this.apiUrl}/razonSocial?nroDocumento=${nroDoc}`;
    console.log(urlRazonSocial);
    return this.http.get<TRazonSocial[]>(urlRazonSocial);
  }
  
  guardarRazon(bo:{}){
    const urlRazonSocial = `${this.apiUrl}/razonSocial`;
    return this.http.post<TRazonSocial>(urlRazonSocial,bo,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }
}

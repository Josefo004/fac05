import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tpersona } from '../../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class PersonasLocalService {

  private apiUrl  : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Buscar Persona por CI
  buscarPersona(ci: string){
    let urlBuscarPersona = `${this.apiUrl}/personas?nro_documento_like=${ci}`;
    return this.http.get<Tpersona[]>(urlBuscarPersona)
      .pipe(catchError(error => of([])))
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TresultatoPersona } from '../../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class PersonasLocalService {

  private apiUrl : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Buscar Persona por CI
  buscarPersona(termino: string){
    let urlBuscarPersona = `${this.apiUrl}/api/personas/${termino}`;
    return this.http.get<TresultatoPersona>(urlBuscarPersona)
      .pipe(catchError(error => of([])))
  }

}

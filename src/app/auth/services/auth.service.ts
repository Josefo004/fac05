import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TLogin, Tusuario } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl  : string = environment.apiUrl;
  private _usurio : Tusuario | undefined;

  get auth() {
    return {...this._usurio};
  }

  constructor(private http: HttpClient) { }


  estaLogeado():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    
    let urlLogin = `${this.apiUrl}/usuarios/${localStorage.getItem('token')}`;
    return this.http.get<Tusuario>(urlLogin)
      .pipe(
        map(resp =>{
          this._usurio = resp;
          return true;
        })
      );
  }
  
  login(loginF:TLogin){
    let urlLogin = `${this.apiUrl}/usuarios?usuario=${loginF.usuario}&password=${loginF.password}`;
    return this.http.get<Tusuario[]>(urlLogin) 
      .pipe(
        tap(resp => {
          this._usurio = resp[0];
          localStorage.setItem('token', resp[0].id+'');
          //LEER PERMISOS
        })
      );
  }

  logout(){
    this._usurio = undefined;
    localStorage.removeItem('token');
  }
}

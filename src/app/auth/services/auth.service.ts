import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TLogin, TUsuario } from '../../interfaces/interfaces';
import { PermisosService } from './permisos.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl   : string = environment.apiUrl;
  private _usuario : TUsuario | undefined;

  get auth() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient,
              private permisos: PermisosService,
              private ngxpermisos: NgxPermissionsService) { }


  estaLogeado():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    let perm = localStorage.getItem('permisos');
    if( perm ) {this.ngxpermisos.loadPermissions(JSON.parse(perm));}
    
    let urlLogin = `${this.apiUrl}/usuarios/${localStorage.getItem('token')}`;
    return this.http.get<TUsuario>(urlLogin)
      .pipe(
        map(resp =>{
          this._usuario = resp;
          return true;
        })
      );
  }

  login(bu:TLogin){
    let urlLogin = `${this.apiUrl}/usuarios?usuario=${bu.usuario}&password=${bu.password}`;
    return this.http.get<TUsuario[]>(urlLogin)
      .pipe(
        tap(resp => {
          this._usuario = resp[0];
          localStorage.setItem('token', resp[0].id+'');
          this.permisos.leer_permisos(resp[0].id).subscribe();
        })
      )
  }

  logout(){
    this._usuario = undefined;
    localStorage.removeItem('token');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService } from 'ngx-permissions';
import { environment } from 'src/environments/environment';
import { Tpermiso } from 'src/app/interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private apiUrl : string = environment.apiUrl;
  private _permisos!: string[];
  get permisos(){
    return {...this._permisos}
  } 

  constructor(private http: HttpClient,
              private ngxPermisions: NgxPermissionsService) { }

  leer_permisos(id:number){
    console.log('ID', id);
    let urlPermisos = `${this.apiUrl}/rolpermisos?id_usuario=${id}`;
    return this.http.get<Tpermiso[]>(urlPermisos)
      .pipe(
        tap(resp => {
          if (resp.length>0) {
            this._permisos = resp[0].permisos;
            localStorage.setItem('permisos', JSON.stringify(this._permisos));
            console.log('TOMANDO PERMISOS',this._permisos);
            this.ngxPermisions.loadPermissions(this._permisos);
          }
        })
      );
  }    
  
  limpiar_permisos(){
    this._permisos = [];
    localStorage.removeItem('permisos');
    this.ngxPermisions.flushPermissions();
  }
}

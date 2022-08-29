import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tmenu } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private apiUrl : string = environment.apiUrl;
  private  _menu : Tmenu [] = [];

  get menu() {
    return this._menu;
  }

  constructor(private http: HttpClient) { }

  loadMenu(){
    let urlMenu = `${this.apiUrl}/menu`;
    return this.http.get<Tmenu[]>(urlMenu)
      .pipe(
        map(resp => {
          this._menu = resp;
          console.log(this._menu);
        })
      );
  }
}

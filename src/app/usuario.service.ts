import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

export interface UsuarioVO
{
  id: number;
  login: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{
  private url = environment.urlServer + environment.uriUsuarios;

  constructor(private http: HttpClient) { }

  getUsuario(id: number): Observable<UsuarioVO>
  {
    return this.http.get<UsuarioVO>(this.url + '/' + id);
  }
}

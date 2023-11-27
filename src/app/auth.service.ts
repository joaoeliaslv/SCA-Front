import { Injectable } from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {share} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UsuarioService, UsuarioVO} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private url = environment.urlServer + environment.uriLogin;
  private preffix = environment.jwtPreffix;
  private key = environment.jwtStorage;
  private authHeader = environment.jwtHeader;
  private usuarioAtual: UsuarioVO | undefined = undefined;
  private usuarioObservable = new Subject<UsuarioVO>();
  private jwt: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  login(login: string, senha: string): Observable<any>
  {
    const obs = this.http.post(this.url, {
      login,
      senha
    }, {observe: 'response'}).pipe(share());
    obs.subscribe((res) =>
    {
      const header = res.headers.get(this.authHeader);
      if (header)
      {
        this.salvarToken(header.replace(this.preffix, ''));
      }
    });

    return obs;
  }

  logout(): Observable<any>
  {
    this.limparToken();
    return of(undefined);
  }

  getUsuarioAtual(): Observable<UsuarioVO | undefined>
  {
    if (this.usuarioAtual)
    {
      return merge(of(this.usuarioAtual), this.usuarioObservable);
    }
    else
    {
      return this.updateUsuarioAtual();
    }
  }

  updateUsuarioAtual(): Observable<UsuarioVO | undefined>
  {
    const token = this.getToken();
    if (token)
    {
      const decoded = this.jwt.decodeToken(token);
      const id = decoded.id;
      if (id)
      {
        const obs = this.usuarioService.getUsuario(id);
        obs.subscribe(res =>
        {
          this.usuarioAtual = res;
          this.usuarioObservable.next(this.usuarioAtual);
        });
        return this.usuarioObservable;
      }
    }
    return of(undefined);
  }

  isLogged(): boolean
  {
    return !this.jwt.isTokenExpired(this.getToken());
  }

  private getToken(): string | undefined
  {
    return localStorage.getItem(this.key) || undefined;
  }

  private salvarToken(token: string): void
  {
    localStorage.setItem(this.key, token);
  }

  private limparToken(): void
  {
    localStorage.removeItem(this.key);
  }
}

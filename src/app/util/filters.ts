import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export class AuthInterceptor implements HttpInterceptor
{
  private authHeader = environment.jwtHeader;
  private key = environment.jwtStorage;
  private preffix = environment.jwtPreffix;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = localStorage.getItem(this.key);
    if (token)
    {
      const clone = req.clone({
        headers: req.headers.set(this.authHeader, this.preffix + token)
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}

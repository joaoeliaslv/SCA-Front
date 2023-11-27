import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate
{
  constructor(private authService: AuthService, private router: Router)
  {
  }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (!this.authService.isLogged())
    {
      this.router.navigate(['paginalogin']);
    }

    return true;
  }

}

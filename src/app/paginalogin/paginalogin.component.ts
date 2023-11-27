import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-paginalogin',
  templateUrl: './paginalogin.component.html',
  styleUrls: ['./paginalogin.component.sass']
})
export class PaginaloginComponent implements OnInit
{
  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private loadingService: LoadingService) { }

  ngOnInit(): void
  {
    if (this.authService.isLogged())
    {
      this.router.navigate(['paginainicial']);
    }
  }

  onEntrar(login: string, senha: string): void
  {
    this.loadingService.loading = true;
    this.authService.login(login, senha).subscribe(res =>
    {
      this.router.navigate(['paginainicial']).then(() =>
      {
        this.loadingService.loading = false;
      });
    }, error =>
    {
      console.error(error);
      if (error.status === 403)
      {
        this.toastr.error('Credenciais incorretas.', 'Erro');
      }
      else
      {
        this.toastr.error('Erro desconhecido, tente novamente mais tarde.', 'Erro');
      }
      this.loadingService.loading = false;
    });
  }
}

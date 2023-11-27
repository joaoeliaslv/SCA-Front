import {AfterContentInit, Component, OnInit} from '@angular/core';
import {UsuarioService} from '../usuario.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-paginainicial',
  templateUrl: './paginainicial.component.html',
  styleUrls: ['./paginainicial.component.sass']
})
export class PaginainicialComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.nomeUsuario = '';
  }

  nomeUsuario: string;

  ngOnInit(): void
  {
    this.authService.getUsuarioAtual().subscribe(usuario =>
    {
      if (usuario)
      {
        this.nomeUsuario = usuario.login;
      }
    });
  }
}

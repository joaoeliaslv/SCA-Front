import {Component, EventEmitter, OnInit} from '@angular/core';
import {links} from './links';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../auth.service';

export const navBarSearch = new EventEmitter<PessoaBusca>();
export interface PessoaBusca
{
  ficha: string;
  nome: string;
  cpf: string;
  rg: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit
{
  escondido = false;
  links = links;
  router: Router;
  opcoes = [
    {value: 'ficha', text: 'Ordem'},
    {value: 'nome', text: 'Nome'},
    {value: 'cpf', text: 'CPF'},
    {value: 'rg', text: 'RG'}
  ];
  opcaoAtual = 'ficha';

  constructor(router: Router, private location: Location, private authService: AuthService)
  {
    this.router = router;
  }

  ngOnInit(): void
  {
    this.atualizarEscondido(this.location.path());
    this.router.events.subscribe(event =>
    {
      if (event instanceof NavigationEnd)
      {
        this.atualizarEscondido(this.router.url);
      }
    });
  }

  /**
   * Colocar aqui qualquer página onde a navbar não deve aparecer
   */
  atualizarEscondido(url: string): void
  {
    this.escondido = url === '/paginalogin' || url.startsWith('/pdfpessoa');
  }

  onSearch(buscado: string): void
  {
    if (this.opcaoAtual === 'ficha')
    {
      navBarSearch.emit({ficha: buscado, nome: '', cpf: '', rg: ''});
    }
    else if (this.opcaoAtual === 'nome')
    {
      navBarSearch.emit({ficha: '', nome: buscado, cpf: '', rg: ''});
    }
    else if (this.opcaoAtual === 'cpf')
    {
      navBarSearch.emit({ ficha: '', nome: '', cpf: buscado, rg: ''});
    }
    else
    {
      navBarSearch.emit({ficha: '', nome: '', cpf: '', rg: buscado});
    }
  }

  onSair(): void
  {
    this.authService.logout().subscribe(res =>
    {
      this.router.navigate(['paginalogin']);
    });
  }
}

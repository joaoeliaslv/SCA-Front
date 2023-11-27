import { Component, OnInit } from '@angular/core';
import {PessoaService, PessoaVO} from '../pessoa.service';
import {navBarSearch, PessoaBusca} from '../navbar/navbar.component';
import {ResizedEvent} from 'angular-resize-event';
import {alturaPessoaPx} from '../pessoa/pessoa.component';
import {SafeUrl} from '@angular/platform-browser';
import {interval} from 'rxjs';
import {environment} from '../../environments/environment';
import {debounceTime, delay, distinctUntilChanged, map} from 'rxjs/operators';
import {ComponentStateService, SaveableComponent, SaveableData} from '../component-state.service';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-listapessoas',
  templateUrl: './listapessoas.component.html',
  styleUrls: ['./listapessoas.component.sass']
})
export class ListapessoasComponent extends SaveableComponent implements OnInit {

  pessoas: Array<PessoaVO> = [];
  paginaAtual: number;
  quantTotal: number;
  tamanhoPagina: number;
  private buscaAtual: PessoaBusca;
  private readonly alturaPessoa = alturaPessoaPx;
  private readonly tempoRecarga = environment.tempoRecarga;

  constructor(private pessoaService: PessoaService,
              stateService: ComponentStateService,
              private loadingService: LoadingService)
  {
    super(stateService);
    this.paginaAtual = 0;
    this.quantTotal = 0;
    this.tamanhoPagina = 6;
    this.buscaAtual = {
      ficha: '',
      nome: '',
      cpf: '',
      rg: ''
    };
  }

  ngOnInit(): void
  {
    super.ngOnInit();
    interval(this.tempoRecarga).pipe(delay(this.tempoRecarga)).subscribe(() =>
    {
      this.updatePessoas(false);
    });
    this.updatePessoas();

    navBarSearch.pipe(debounceTime(1000),
      map(value =>
      {
        if (value && value.ficha)
        {
          value.ficha = value.ficha.trim();
        }

        if (value && value.nome)
        {
          value.nome = value.nome.trim();
        }

        if (value && value.cpf)
        {
          value.cpf = value.cpf.trim();
        }

        if (value && value.rg)
        {
          value.rg = value.rg.trim();
        }
        return value;
      }),
      distinctUntilChanged()).subscribe((busca: PessoaBusca) =>
    {
      this.buscaAtual = busca;
      this.updatePessoas();
    });
  }

  updatePessoas(carregar: boolean = true): void
  {
    if (carregar)
    {
      this.loadingService.loading = true;
    }
    this.pessoaService.getPessoas(this.paginaAtual - 1,
      this.tamanhoPagina,
      this.buscaAtual.ficha,
      this.buscaAtual.nome,
      this.buscaAtual.cpf,
      this.buscaAtual.rg).subscribe(res =>
    {
      this.pessoas = res.content;
      this.pessoas.forEach(pessoa =>
      {
        if (pessoa.assinatura)
        {
          pessoa.assinatura = 'data:image;base64,' + pessoa.assinatura;
        }
      });
      this.quantTotal = res.totalElements;
      const quantPaginas = Math.ceil(this.quantTotal / this.tamanhoPagina);
      if (this.paginaAtual > quantPaginas)
      {
        this.paginaAtual = quantPaginas - 1;
        this.updatePessoas(false);
      }
      super.ngOnChanges();
      this.loadingService.loading = false;
    });
  }

  onPageChange(paginaAtual: number): void
  {
    this.paginaAtual = paginaAtual;
    this.updatePessoas();
  }

  onResized(event: ResizedEvent): void
  {
    const tamanhoNovo = Math.max(Math.floor(event.newHeight / this.alturaPessoa), 1);

    if (tamanhoNovo !== this.tamanhoPagina)
    {
      const quantPaginas = Math.ceil(this.quantTotal / tamanhoNovo);
      if (this.paginaAtual > quantPaginas)
      {
        this.paginaAtual = quantPaginas;
      }

      this.tamanhoPagina = tamanhoNovo;
      this.onPageChange(this.paginaAtual);
    }
  }

  getSaveableData(): SaveableData
  {
    return {
      data: {
        paginaAtual: this.paginaAtual,
        quantTotal: this.quantTotal,
        tamanhoPagina: this.tamanhoPagina,
        buscaAtual: this.buscaAtual
      }
    };
  }

  getSaveableDataKey(): string
  {
    return 'listaPessoas';
  }
}

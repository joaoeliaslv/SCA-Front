import {Component, ElementRef, OnInit} from '@angular/core';
import {EnderecoVO, PessoaService, PessoaVO} from '../pessoa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {of} from 'rxjs';
import {handle400Error} from '../util/errorHandler';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-paginapessoa',
  templateUrl: './paginapessoa.component.html',
  styleUrls: ['./paginapessoa.component.sass']
})
export class PaginapessoaComponent implements OnInit {
  pessoa: PessoaVO;

  constructor(private pessoaService: PessoaService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private router: Router,
              private loadingService: LoadingService)
  {
    this.pessoa = pessoaService.getEmptyPessoa();
  }

  ngOnInit(): void
  {
    this.updatePessoa();
  }

  updatePessoa(): void
  {
    this.loadingService.loading = true;
    this.pessoaService.getPessoaAtual().subscribe(pessoa =>
    {
      if (pessoa.assinatura)
      {
        pessoa.assinatura = 'data:image;base64,' + pessoa.assinatura;
      }
      this.pessoa = pessoa;
      this.loadingService.loading = false;
    });
  }

  onSalvar(pessoa: PessoaVO): void
  {
    this.loadingService.loading = true;
    const obs = this.pessoaService.atualizar(pessoa, pessoa.id);
    obs.subscribe(res =>
    {
      this.loadingService.loading = false;
      this.updatePessoa();
      this.toastr.success('Dados atualizados com sucesso.', 'Sucesso');
    }, error =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.toastr);
  }
}

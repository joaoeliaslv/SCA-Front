import { Component, OnInit } from '@angular/core';
import {PessoaService, PessoaVO} from '../pessoa.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {handle400Error} from '../util/errorHandler';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-novapessoa',
  templateUrl: './novapessoa.component.html',
  styleUrls: ['./novapessoa.component.sass']
})
export class NovapessoaComponent implements OnInit
{
  constructor(private pessoaService: PessoaService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private router: Router,
              private loadingService: LoadingService)
  {
  }

  ngOnInit(): void
  {
  }

  onSalvar(pessoa: PessoaVO): void
  {
    this.loadingService.loading = true;
    const obs = this.pessoaService.criar(pessoa);
    obs.subscribe(res =>
    {
      this.loadingService.loading = false;
      this.toastr.success('Pessoa cadastrada com sucesso.', 'Sucesso');
      this.router.navigate(['listapessoas']);
    }, error =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.toastr);
  }
}


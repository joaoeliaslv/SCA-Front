import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {EnderecoVO, PessoaService, PessoaVO} from '../pessoa.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DateAdapter} from '@angular/material/core';
import * as moment from 'moment';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
const pdfMake = require('pdfmake/build/pdfmake');

@Component({
  selector: 'app-pdfpessoa',
  templateUrl: './pdfpessoa.component.html',
  styleUrls: ['./pdfpessoa.component.sass']
})
export class PdfpessoaComponent implements OnInit
{
  private pdfmake: any;
  dataEmissaoFormatada = '';
  readonly dataLocale = environment.datalocale;
  readonly cpfmask = environment.cpfmask;
  readonly datamask = environment.datamask;
  // @ts-ignore
  pessoa: PessoaVO = null;
  imprimindo = false;

  form = this.formbuilder.group({
    ficha: [{value: '', disabled: true}, Validators.required],
    nome: [{value: '', disabled: true}, Validators.required],
    cpf: [{value: '', disabled: true}, Validators.required],
    rg: [{value: '', disabled: true}, Validators.required],
    dataNasc: [{value: '', disabled: true}, Validators.required],
    dataEmissao: [{value: '', disabled: true}, Validators.required],
    estadocivil: [{value: '', disabled: true}, Validators.required],
    profissao: [{value: '', disabled: true}, Validators.required],
    pai: [{value: '', disabled: true}, Validators.required],
    mae: [{value: '', disabled: true}, Validators.required],
    enderecoEstado: [{value: '', disabled: true}, Validators.required],
    enderecoCidade: [{value: '', disabled: true}, Validators.required],
    enderecoRua: [{value: '', disabled: true}, Validators.required],
    enderecoNumero: [{value: '', disabled: true}, Validators.required],
    enderecoBairro: [{value: '', disabled: true}, Validators.required],
    enderecoComplemento: [{value: '', disabled: true}]
  });

  constructor(private pessoaService: PessoaService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private router: Router,
              private sanitizer: DomSanitizer,
              private formbuilder: FormBuilder,
              private route: ActivatedRoute,
              private date: DateAdapter<any>,
              private cd: ChangeDetectorRef)
  {
  }

  ngOnInit(): void
  {
    this.atualizarPessoa();
  }

  atualizarPessoa(): void
  {
    this.route.params.subscribe(res =>
    {
      if (res.id)
      {
        this.pessoaService.ler(res.id).subscribe(pessoa =>
        {
          this.pessoa = pessoa;
          const data = moment();
          data.locale(this.dataLocale);
          this.dataEmissaoFormatada = data.format('LL');
          this.updateForm();
        });
      }
    });
  }

  updateForm(): void
  {
    if (this.pessoa)
    {
      this.form.patchValue({
        ficha: this.pessoa.ficha,
        nome: this.pessoa.nome,
        cpf: this.pessoa.cpf,
        rg: this.pessoa.rg,
        dataNasc: this.pessoa.dataNasc,
        dataEmissao: this.pessoa.dataEmissao,
        estadocivil: this.pessoa.estadocivil,
        profissao: this.pessoa.profissao,
        pai: this.pessoa.pai,
        mae: this.pessoa.mae,
        enderecoEstado: this.pessoa.endereco.estado,
        enderecoCidade: this.pessoa.endereco.cidade,
        enderecoRua: this.pessoa.endereco.rua,
        enderecoNumero: this.pessoa.endereco.numero,
        enderecoBairro: this.pessoa.endereco.bairro,
        enderecoComplemento: this.pessoa.endereco.complemento
      });
    }
  }

  generatePdf(): void
  {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    this.pdfmake.createPdf(documentDefinition).open();
  }

  onImprimir(): void
  {
    this.imprimindo = true;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';

    style.appendChild(document.createTextNode('@page { size: A4 portrait 60%; margin: 7.5mm 89mm 5mm 7.5mm;}'));
    head.appendChild(style);

    this.cd.detectChanges();
    window.print();
    this.imprimindo = false;
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {EnderecoVO, PessoaService, PessoaVO} from '../pessoa.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {base64ToArrayBuffer, isPdf} from '../util/bytes';
import {LoadingService} from '../loading.service';
import {Local} from 'protractor/built/driverProviders';
import {EstadoVO, LocalService, MunicipioVO} from '../local.service';
import {_filter, hasValue, stringComparatorUppercase} from '../util/strings';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pessoaform',
  templateUrl: './pessoaform.component.html',
  styleUrls: ['./pessoaform.component.sass']
})
export class PessoaformComponent implements OnInit, OnChanges
{
  private pdfmake: any;
  estados: Array<EstadoVO> = [];
  cidades: Array<MunicipioVO> = [];

  form = this.formbuilder.group({
    ficha: ['0', Validators.required],
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', Validators.required],
    dataNasc: ['', Validators.required],
    dataEmissao: ['', Validators.required],
    estadocivil: ['', Validators.required],
    profissao: ['', Validators.required],
    pai: ['', Validators.required],
    mae: ['', Validators.required],
    enderecoEstado: ['', [Validators.required]],
    enderecoCidade: ['', [Validators.required]],
    enderecoRua: ['', Validators.required],
    enderecoNumero: ['', Validators.required],
    enderecoBairro: ['', Validators.required],
    enderecoComplemento: ['']
  });
  readonly cpfmask = environment.cpfmask;
  readonly datamask = environment.datamask;
  readonly dataoutput = 'yyyy-MM-DD';
  @Output() submitEvent = new EventEmitter<PessoaVO>();
  // @ts-ignore
  @Input() pessoa: PessoaVO = null;
  processedAss: SafeUrl = '';
  assinatura = '';
  asspdf = false;
  cidadesFiltradas: Observable<Array<MunicipioVO>> | undefined;
  estadosFiltrados: Observable<Array<EstadoVO>> | undefined;

  constructor(private pessoaService: PessoaService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private router: Router,
              private sanitizer: DomSanitizer,
              private formbuilder: FormBuilder,
              private loadingService: LoadingService,
              private localService: LocalService)
  {
  }

  ngOnInit(): void
  {
    this.updateForm();
    this.atualizarAssPDF();

    const cidadeCampo = this.form.get('enderecoCidade');
    if (cidadeCampo)
    {
      this.cidadesFiltradas = cidadeCampo.valueChanges.pipe(
          startWith(''),
          map(value => _filter(value, this.cidades, 'nome'))
        );
      cidadeCampo.valueChanges.pipe().subscribe(res =>
      {
        const hasval = hasValue(cidadeCampo.value, this.cidades, 'nome');
        if (hasval >= 0)
        {
          cidadeCampo.setErrors(null);
          cidadeCampo.setValue(this.cidades[hasval].nome, {emitEvent: false});
        }
        else
        {
          cidadeCampo.setErrors({incorrect: true});
        }
      });
    }
    const estadoCampo = this.form.get('enderecoEstado');
    if (estadoCampo)
    {
      this.estadosFiltrados = estadoCampo.valueChanges.pipe(
        startWith(''),
        map(value => _filter(value, this.estados, 'sigla'))
      );
      estadoCampo.valueChanges.subscribe(res =>
      {
        const hasval = hasValue(estadoCampo.value, this.estados, 'sigla');
        if (hasval >= 0)
        {
          estadoCampo.setErrors(null);
          estadoCampo.setValue(this.estados[hasval].sigla, {emitEvent: false});
          this.onEstadoChange(estadoCampo.value);
        }
        else
        {
          estadoCampo.setErrors({incorrect: true});
        }
      });
    }
  }

  ngOnChanges(): void
  {
    this.updateForm();
    this.atualizarAssPDF();
  }

  updateForm(): void
  {
    this.localService.getEstados().subscribe(res =>
    {
      this.estados = res.sort((e1, e2) =>
      {
        return stringComparatorUppercase(e1.sigla, e2.sigla);
      });
    });

    if (this.pessoa)
    {
      this.assinatura = this.pessoa.assinatura;
      this.processedAss = this.getProcessedAss();
      this.form.patchValue({
        ficha: this.pessoa.ficha,
        nome: this.pessoa.nome,
        cpf: this.pessoa.cpf,
        rg: this.pessoa.rg,
        dataNasc: this.pessoa.dataNasc,
        dataEmissao: this.pessoa.dataEmissao,
        estadocivil: this.pessoa.estadocivil,
        profissao: this.pessoa.profissao,
        assinatura: this.pessoa.assinatura,
        pai: this.pessoa.pai,
        mae: this.pessoa.mae,
        enderecoEstado: this.pessoa.endereco.estado,
        enderecoCidade: this.pessoa.endereco.cidade,
        enderecoRua: this.pessoa.endereco.rua,
        enderecoNumero: this.pessoa.endereco.numero,
        enderecoBairro: this.pessoa.endereco.bairro,
        enderecoComplemento: this.pessoa.endereco.complemento
      });

      this.onEstadoChange(this.pessoa.endereco.estado);
    }
    else
    {
      this.form.patchValue({
        dataEmissao: moment().format()
      });
    }
  }

  onClickEditImg(element: HTMLInputElement): void
  {
    const event = new MouseEvent('click', {bubbles: false});
    element.dispatchEvent(event);
  }

  onSalvar(): void
  {
    const pessoa: PessoaVO = this.pessoaService.getEmptyPessoa();
    const raw = this.form.getRawValue();
    pessoa.id = -1;
    pessoa.ficha = raw.ficha;
    pessoa.nome = raw.nome.toUpperCase();
    pessoa.cpf = raw.cpf.toUpperCase();
    pessoa.rg = raw.rg.toUpperCase();
    pessoa.dataNasc = moment(raw.dataNasc).format(this.dataoutput);
    pessoa.dataEmissao = moment(raw.dataEmissao).format(this.dataoutput);
    pessoa.estadocivil = raw.estadocivil.toUpperCase();
    pessoa.profissao = raw.profissao.toUpperCase();
    pessoa.assinatura = this.assinatura;
    pessoa.pai = raw.pai.toUpperCase();
    pessoa.mae = raw.mae.toUpperCase();
    pessoa.endereco = {} as EnderecoVO;
    pessoa.endereco.id = -1;
    pessoa.endereco.rua = raw.enderecoRua.toUpperCase();
    pessoa.endereco.numero = raw.enderecoNumero.toUpperCase();
    pessoa.endereco.bairro = raw.enderecoBairro.toUpperCase();
    pessoa.endereco.complemento = raw.enderecoComplemento.toUpperCase();
    pessoa.endereco.cidade = raw.enderecoCidade.toUpperCase();
    pessoa.endereco.estado = raw.enderecoEstado.toUpperCase();
    if (this.pessoa)
    {
      pessoa.id = this.pessoa.id;
    }

    this.submitEvent.emit(pessoa);
    this.form.markAsPristine();
  }

  onExcluir(): void
  {
    const mensagem = 'Você tem certeza que deseja excluir essa pessoa?<br><strong>Essa ação não pode ser desfeita.</strong>';
    const titulo = 'Confirmar Exclusão';
    const dialogData = {message: mensagem, title: titulo};

    const dialog = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialog.afterClosed().subscribe(confirmed =>
    {
      if (confirmed)
      {
        this.loadingService.loading = true;
        this.pessoaService.deletar(this.pessoa.id).subscribe(res =>
        {
          this.toastr.success('Pessoa excluída com sucesso.', 'Sucesso');
          this.router.navigate(['/listapessoas']);
          this.loadingService.loading = false;
        }, error =>
        {
          this.toastr.error('Ocorreu um erro desconhecido, tente novamente.', 'Erro');
          this.loadingService.loading = false;
        });
      }
    });
  }

  onAssChange(event: any): void
  {
    this.form.markAsDirty();
    if (event.target && event.target.files && event.target.files[0])
    {
      this.loadingService.loading = true;
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (evt) => {
        // @ts-ignore
        this.assinatura = (evt.target.result as string);
        this.processedAss = this.getProcessedAss();
        this.atualizarAssPDF();
        this.loadingService.loading = false;
      };
    }
  }

  onEstadoChange(estadoAtual: string): void
  {
    this.localService.getMunicipiosUF(estadoAtual).subscribe(res => this.cidades = res);
  }

  getProcessedAss(): SafeUrl
  {
    return this.sanitizer.bypassSecurityTrustUrl(this.assinatura);
  }

  onGerarPDF(): void
  {
    this.router.navigate(['pdfpessoa', this.pessoa.id]);
  }

  atualizarAssPDF(): void
  {
    this.asspdf = isPdf(this.assinatura.split(',')[1]);
  }
}

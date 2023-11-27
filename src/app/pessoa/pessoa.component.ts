import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PessoaService} from '../pessoa.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.sass']
})
export class PessoaComponent implements OnInit {
  readonly cpfmask = environment.cpfmask;
  router: Router;

  constructor(router: Router, private pessoaService: PessoaService, private sanitizer: DomSanitizer) {
    this.router = router;
  }

  @Input() pessoa: any;

  ngOnInit(): void {
  }

  onNavigate(): void {
    this.pessoaService.setPessoaAtual(this.pessoa);
    this.router.navigate(['paginapessoa']);
  }

  getProcessedImage(imagem: string): SafeUrl
  {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }
}

export const alturaPessoaPx = 85;

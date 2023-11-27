import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map, share} from 'rxjs/operators';

export interface PessoaVO
{
  id: number;
  ficha: number;
  nome: string;
  cpf: string;
  rg: string;
  dataNasc: string;
  dataEmissao: string;
  estadocivil: string;
  profissao: string;
  assinatura: string;
  pai: string;
  mae: string;
  endereco: EnderecoVO;
}

export interface EnderecoVO
{
  id: number;
  estado: string;
  cidade: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento: string;
}

export interface Pageable<T>
{
  content: Array<T>;
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService
{
  private url = environment.urlServer + environment.uriPessoas;

  private pessoaAtual: PessoaVO;

  constructor(private http: HttpClient)
  {
    this.pessoaAtual = this.getEmptyPessoa();
  }

  ler(id: string | null): Observable<PessoaVO>
  {
    return this.http.get<PessoaVO>(this.url + '/' + id).pipe(map(res =>
    {
      res.dataEmissao = res.dataEmissao + 'T00:00:00';
      res.dataNasc = res.dataNasc + 'T00:00:00';
      return res;
    }));
  }

  getPessoaAtual(): Observable<PessoaVO>
  {
    const id = JSON.parse(localStorage.getItem('PessoaAtualPaginaPessoa') as string);
    return this.ler(id);
  }

  setPessoaAtual(pessoa: PessoaVO): void
  {
    this.pessoaAtual = pessoa;
    localStorage.setItem('PessoaAtualPaginaPessoa', JSON.stringify(pessoa.id));
  }

  getPessoas(page: number, size: number,
             ficha: any = '',
             nome: any = '',
             cpf: any = '',
             rg: any = ''): Observable<Pageable<PessoaVO>>
  {
    const params = new HttpParams().append('page', String(page))
      .append('size', String(size))
      .append('sort', 'ficha,asc')
      .append('nome', nome)
      .append('cpf', cpf)
      .append('rg', rg)
      .append('ficha', ficha);

    return this.http.get<Pageable<PessoaVO>>(this.url, {params}).pipe(map(res =>
    {
      if (res && res.content)
      {
        res.content.forEach(pessoa =>
        {
          pessoa.dataNasc = pessoa.dataNasc + 'T00:00:00';
          pessoa.dataEmissao = pessoa.dataNasc + 'T00:00:00';
        });
      }
      return res;
    }));
  }

  criar(pessoaLida: PessoaVO): Observable<any>
  {
    const pessoa = Object.assign({}, pessoaLida);
    pessoa.id = -1;
    pessoa.assinatura = this.limparImagem(pessoa.assinatura);
    return this.http.post(this.url, pessoa).pipe(share());
  }

  atualizar(pessoaLida: PessoaVO, id: number): Observable<any>
  {
    const pessoa = Object.assign({}, pessoaLida);
    pessoa.assinatura = this.limparImagem(pessoa.assinatura);
    return this.http.put(this.url + '/' + id, pessoa);
  }

  deletar(id: number): Observable<any>
  {
    return this.http.delete(this.url + '/' + id);
  }

  private limparImagem(imagem: string): string
  {
    if (imagem && imagem.startsWith('data:'))
    {
      return imagem.split(',')[1];
    }
    return imagem;
  }

  public getEmptyPessoa(): PessoaVO
  {
    return {
      id: -1,
      ficha: -1,
      nome: '',
      cpf: '',
      rg: '',
      dataNasc: '',
      dataEmissao: '',
      estadocivil: '',
      profissao: '',
      assinatura: '',
      pai: '',
      mae: '',
      endereco: {
        id: -1,
        estado: '',
        cidade: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: ''
      }
    };
  }
}


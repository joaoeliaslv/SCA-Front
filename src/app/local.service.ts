import { Injectable } from '@angular/core';
// @ts-ignore
import municipiosJson from '../assets/municipios.json';
// @ts-ignore
import estadosJson from '../assets/estados.json';
import {Observable, of} from 'rxjs';

export interface MunicipioVO
{
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: EstadoVO;
    }
  };
  'regiao-imediata': {};
}

export interface EstadoVO
{
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LocalService
{
  private municipios: Array<MunicipioVO> = (Array.from(municipiosJson) as Array<MunicipioVO>).map(mun =>
  {
    mun.nome = mun.nome.toUpperCase();
    return mun;
  });
  private estados: Array<EstadoVO> = Array.from(estadosJson);

  constructor()
  {
  }

  getMunicipios(): Observable<Array<MunicipioVO>>
  {
    return of(this.municipios.slice());
  }

  getMunicipiosUF(uf: string): Observable<Array<MunicipioVO>>
  {
    return of(this.municipios.filter(mun => mun.microrregiao.mesorregiao.UF.sigla.toLowerCase() === uf.toLowerCase()));
  }

  getEstados(): Observable<Array<EstadoVO>>
  {
    return of(this.estados.slice());
  }
}

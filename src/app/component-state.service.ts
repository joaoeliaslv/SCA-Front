import {Component, Injectable, OnChanges, OnInit} from '@angular/core';

/**
 * Classe que deve ser extendida para o salvamento do estado de um componente qualquer.
 * Precaução: Salvar dados como vetores extensos pode causar perda de performance.
 */
@Component({
  template: ''
})
export abstract class SaveableComponent implements OnChanges, OnInit
{
  private firstRestore: boolean;

  constructor(private stateService: ComponentStateService)
  {
    this.firstRestore = false;
  }

  /**
   * Restaura o estado salvo do componente. Deve ser chamado pela subclasse caso a
   * mesma sobrescreva a função.
   */
  ngOnInit(): void
  {
    this.restoreData();
  }

  /**
   * Salva o estado do componente. Deve ser chamado no momento da mudança dos dados
   * de um componente, caso as mudanças no mesmo não sejam registradas pelo callback
   * de OnChanges.
   */
  ngOnChanges(): void
  {
    this.saveData();
  }

  /**
   * Deve retornar os dados que devem ser salvos e retornados. As chaves dos elementos
   * do objeto "data" devem ter o mesmo nome da propriedade da classe para que a recu-
   * peração de dados aconteça corretamente.
   */
  abstract getSaveableData(): SaveableData;

  /**
   * Deve retornar uma chave fixa que será usada para salvar e recuperar os dados
   * do componente.
   */
  abstract getSaveableDataKey(): string;

  private saveData(): void
  {
    // Não salvar o estado caso o ngOnChanges tenha sido chamado antes do ngInit.
    if (!this.firstRestore)
    {
      return;
    }

    const data = this.getSaveableData();
    const key = this.getSaveableDataKey();

    this.stateService.saveData(key, data.data);
  }

  private restoreData(): void
  {
    const key = this.getSaveableDataKey();
    const data = this.stateService.retrieveData(key);
    this[`firstRestore`] = true;
    if (!data)
    {
      return;
    }

    Object.keys(data).forEach(keyValue =>
    {
      // @ts-ignore
      this[keyValue] = data[keyValue];
    });
  }
}

export interface SaveableData
{
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentStateService
{
  private dataStorage = {};

  constructor() { }

  saveData(key: string, data: any): void
  {
    // @ts-ignore
    this.dataStorage[key] = data;
  }

  retrieveData(key: string): any
  {
    // @ts-ignore
    return this.dataStorage[key];
  }
}

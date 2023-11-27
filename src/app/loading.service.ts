import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService
{
  private loadingSubject = new Subject<boolean>();
  private isLoading = false;

  constructor() { }

  set loading(loading: boolean)
  {
    this.isLoading = loading;
    this.loadingSubject.next(loading);
  }

  get loading(): boolean
  {
    return this.isLoading;
  }

  get loading$(): Observable<boolean>
  {
    return this.loadingSubject;
  }
}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';
import {DateAdapter} from '@angular/material/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit
{
  title = environment.scctitle;
  readonly dataLocale = environment.datalocale;
  loading = false;

  constructor(private titleService: Title,
              private date: DateAdapter<any>,
              private loadingService: LoadingService,
              private cd: ChangeDetectorRef)
  {
    titleService.setTitle(this.title);
    date.setLocale(this.dataLocale);
  }

  ngOnInit(): void
  {
    this.loadingService.loading$.subscribe(res =>
    {
      this.loading = res;
      this.cd.detectChanges();
    });
  }
}

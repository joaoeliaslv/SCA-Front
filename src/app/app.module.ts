import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { ListapessoasComponent } from './listapessoas/listapessoas.component';
import { PaginainicialComponent } from './paginainicial/paginainicial.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PaginapessoaComponent } from './paginapessoa/paginapessoa.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { NovapessoaComponent } from './novapessoa/novapessoa.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import { SearchbarComponent } from './searchbar/searchbar.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {AngularResizedEventModule} from 'angular-resize-event';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PaginaloginComponent } from './paginalogin/paginalogin.component';
import {LoginGuard} from './util/loginGuard';
import {AuthInterceptor} from './util/filters';
import {MaskDirective, NgxMaskModule} from 'ngx-mask';
import { PessoaformComponent } from './pessoaform/pessoaform.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PdfpessoaComponent } from './pdfpessoa/pdfpessoa.component';
import {MatDividerModule} from '@angular/material/divider';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {APP_DATE_FORMATS, AppDateAdapter} from './util/dateadapter';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListapessoasComponent,
    PaginainicialComponent,
    PessoaComponent,
    PaginapessoaComponent,
    NovapessoaComponent,
    ConfirmDialogComponent,
    SearchbarComponent,
    PaginaloginComponent,
    PessoaformComponent,
    PdfpessoaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    NgMatSearchBarModule,
    MatOptionModule,
    MatSelectModule,
    AngularResizedEventModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    PdfViewerModule,
    MatAutocompleteModule,
  ],
  providers: [
      LoginGuard,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: DateAdapter, useClass: AppDateAdapter},
      {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
      MatDatepickerModule,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

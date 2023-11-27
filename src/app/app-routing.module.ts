import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaginainicialComponent} from './paginainicial/paginainicial.component';
import {ListapessoasComponent} from './listapessoas/listapessoas.component';
import {PaginapessoaComponent} from './paginapessoa/paginapessoa.component';
import {NovapessoaComponent} from './novapessoa/novapessoa.component';
import {PaginaloginComponent} from './paginalogin/paginalogin.component';
import {LoginGuard} from './util/loginGuard';
import {PdfpessoaComponent} from './pdfpessoa/pdfpessoa.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginainicial',
    pathMatch: 'full'
  },
  {
    path: 'paginainicial',
    component: PaginainicialComponent,
    canActivate: [LoginGuard]
  },
  {
   path: 'listapessoas',
   component: ListapessoasComponent,
   canActivate: [LoginGuard]
  },
  {
    path: 'paginapessoa',
    component: PaginapessoaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'novapessoa',
    component: NovapessoaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'paginalogin',
    component: PaginaloginComponent
  },
  {
    path: 'pdfpessoa/:id',
    component: PdfpessoaComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

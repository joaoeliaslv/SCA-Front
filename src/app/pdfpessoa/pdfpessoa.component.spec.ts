import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfpessoaComponent } from './pdfpessoa.component';

describe('PdfpessoaComponent', () => {
  let component: PdfpessoaComponent;
  let fixture: ComponentFixture<PdfpessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfpessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfpessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

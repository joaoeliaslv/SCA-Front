import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovapessoaComponent } from './novapessoa.component';

describe('NovapessoaComponent', () => {
  let component: NovapessoaComponent;
  let fixture: ComponentFixture<NovapessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovapessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovapessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

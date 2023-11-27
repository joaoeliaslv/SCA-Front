import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaformComponent } from './pessoaform.component';

describe('PessoaformComponent', () => {
  let component: PessoaformComponent;
  let fixture: ComponentFixture<PessoaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

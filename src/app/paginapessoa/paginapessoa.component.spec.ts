import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginapessoaComponent } from './paginapessoa.component';

describe('PaginapessoaComponent', () => {
  let component: PaginapessoaComponent;
  let fixture: ComponentFixture<PaginapessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginapessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginapessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

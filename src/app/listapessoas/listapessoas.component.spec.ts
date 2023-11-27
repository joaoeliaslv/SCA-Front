import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapessoasComponent } from './listapessoas.component';

describe('ListapessoasComponent', () => {
  let component: ListapessoasComponent;
  let fixture: ComponentFixture<ListapessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapessoasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

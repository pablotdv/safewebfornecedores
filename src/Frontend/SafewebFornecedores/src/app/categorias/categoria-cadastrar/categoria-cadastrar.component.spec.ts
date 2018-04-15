import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCadastrarComponent } from './categoria-cadastrar.component';

describe('CategoriaCadastrarComponent', () => {
  let component: CategoriaCadastrarComponent;
  let fixture: ComponentFixture<CategoriaCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

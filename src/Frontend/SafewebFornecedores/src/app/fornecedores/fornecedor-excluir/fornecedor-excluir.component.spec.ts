import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorExcluirComponent } from './fornecedor-excluir.component';

describe('FornecedorExcluirComponent', () => {
  let component: FornecedorExcluirComponent;
  let fixture: ComponentFixture<FornecedorExcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

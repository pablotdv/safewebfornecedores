import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorEditarComponent } from './fornecedor-editar.component';

describe('FornecedorEditarComponent', () => {
  let component: FornecedorEditarComponent;
  let fixture: ComponentFixture<FornecedorEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

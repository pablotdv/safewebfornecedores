import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaExcluirComponent } from './proposta-excluir.component';

describe('PropostaExcluirComponent', () => {
  let component: PropostaExcluirComponent;
  let fixture: ComponentFixture<PropostaExcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

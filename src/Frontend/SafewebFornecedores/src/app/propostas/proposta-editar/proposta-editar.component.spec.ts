import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaEditarComponent } from './proposta-editar.component';

describe('PropostaEditarComponent', () => {
  let component: PropostaEditarComponent;
  let fixture: ComponentFixture<PropostaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

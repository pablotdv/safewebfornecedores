import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaAprovarComponent } from './proposta-aprovar.component';

describe('PropostaAprovarComponent', () => {
  let component: PropostaAprovarComponent;
  let fixture: ComponentFixture<PropostaAprovarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaAprovarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaAprovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

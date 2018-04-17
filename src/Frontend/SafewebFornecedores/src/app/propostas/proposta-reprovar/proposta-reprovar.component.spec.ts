import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaReprovarComponent } from './proposta-reprovar.component';

describe('PropostaReprovarComponent', () => {
  let component: PropostaReprovarComponent;
  let fixture: ComponentFixture<PropostaReprovarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaReprovarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaReprovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

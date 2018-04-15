import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaCadastrarComponent } from './proposta-cadastrar.component';

describe('PropostaCadastrarComponent', () => {
  let component: PropostaCadastrarComponent;
  let fixture: ComponentFixture<PropostaCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

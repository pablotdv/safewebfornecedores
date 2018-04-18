import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaUploadComponent } from './proposta-upload.component';

describe('PropostaUploadComponent', () => {
  let component: PropostaUploadComponent;
  let fixture: ComponentFixture<PropostaUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

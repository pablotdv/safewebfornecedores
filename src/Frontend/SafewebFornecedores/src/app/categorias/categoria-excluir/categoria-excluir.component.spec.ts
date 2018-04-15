import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaExcluirComponent } from './categoria-excluir.component';

describe('CategoriaExcluirComponent', () => {
  let component: CategoriaExcluirComponent;
  let fixture: ComponentFixture<CategoriaExcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

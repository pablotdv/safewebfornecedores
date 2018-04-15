import { TestBed, inject } from '@angular/core/testing';

import { FornecedoresService } from './fornecedores.service';

describe('FornecedoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornecedoresService]
    });
  });

  it('should be created', inject([FornecedoresService], (service: FornecedoresService) => {
    expect(service).toBeTruthy();
  }));
});

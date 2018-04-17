import { TestBed, inject } from '@angular/core/testing';

import { NotificationErrorsService } from './notification-errors.service';

describe('NotificationErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationErrorsService]
    });
  });

  it('should be created', inject([NotificationErrorsService], (service: NotificationErrorsService) => {
    expect(service).toBeTruthy();
  }));
});

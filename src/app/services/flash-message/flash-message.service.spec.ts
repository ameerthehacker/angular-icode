import { TestBed, inject } from '@angular/core/testing';

import { FlashMessageService } from './flash-message.service';

describe('FlashMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashMessageService]
    });
  });

  it('should be created', inject([FlashMessageService], (service: FlashMessageService) => {
    expect(service).toBeTruthy();
  }));
});

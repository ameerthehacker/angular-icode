import { TestBed, inject } from '@angular/core/testing';

import { ShowProgressService } from './show-progress.service';

describe('ShowProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowProgressService]
    });
  });

  it('should be created', inject([ShowProgressService], (service: ShowProgressService) => {
    expect(service).toBeTruthy();
  }));
});

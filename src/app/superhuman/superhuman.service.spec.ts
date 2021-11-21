import { TestBed, inject } from '@angular/core/testing';

import { SuperhumanService } from './superhuman.service';

describe('SuperhumanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperhumanService]
    });
  });

  it('should be created', inject([SuperhumanService], (service: SuperhumanService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { ProprieteService } from './_services/propriete.service';

describe('ProprieteService', () => {
  let service: ProprieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

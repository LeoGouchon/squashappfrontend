import { TestBed } from '@angular/core/testing';

import { ApiMatchService } from './api-match.service';

describe('ApiMatchService', () => {
  let service: ApiMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

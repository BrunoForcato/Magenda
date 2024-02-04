import { TestBed } from '@angular/core/testing';

import { ActiveRoutesService } from './active-routes.service';

describe('ActiveRoutesService', () => {
  let service: ActiveRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

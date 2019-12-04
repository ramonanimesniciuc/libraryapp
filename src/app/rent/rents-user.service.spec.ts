import { TestBed } from '@angular/core/testing';

import { RentsUserService } from './rents-user.service';

describe('RentsUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentsUserService = TestBed.get(RentsUserService);
    expect(service).toBeTruthy();
  });
});

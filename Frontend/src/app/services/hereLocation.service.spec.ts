/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HereLocationService } from './hereLocation.service';

describe('Service: HereLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HereLocationService]
    });
  });

  it('should ...', inject([HereLocationService], (service: HereLocationService) => {
    expect(service).toBeTruthy();
  }));
});

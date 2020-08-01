/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleLocationService } from './googleLocation.service';

describe('Service: GoogleLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleLocationService]
    });
  });

  it('should ...', inject([GoogleLocationService], (service: GoogleLocationService) => {
    expect(service).toBeTruthy();
  }));
});

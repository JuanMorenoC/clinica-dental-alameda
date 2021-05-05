import { TestBed } from '@angular/core/testing';

import { OdontologoService } from './odontologo.service';

describe('OdontologoService', () => {
  let service: OdontologoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdontologoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

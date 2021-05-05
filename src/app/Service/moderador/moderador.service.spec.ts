import { TestBed } from '@angular/core/testing';

import { ModeradorService } from './moderador.service';

describe('ModeradorService', () => {
  let service: ModeradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

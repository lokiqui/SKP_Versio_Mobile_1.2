import { TestBed } from '@angular/core/testing';

import { InstruccionService } from './instruccion.service';

describe('InstruccionService', () => {
  let service: InstruccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstruccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

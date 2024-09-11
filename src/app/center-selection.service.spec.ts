import { TestBed } from '@angular/core/testing';

import { CenterSelectionService } from './center-selection.service';

describe('CenterSelectionService', () => {
  let service: CenterSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

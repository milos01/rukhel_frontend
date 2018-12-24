import { TestBed } from '@angular/core/testing';

import { ModalCtrlService } from './modal-ctrl.service';

describe('ModalCtrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalCtrlService = TestBed.get(ModalCtrlService);
    expect(service).toBeTruthy();
  });
});

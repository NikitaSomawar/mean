import { TestBed, inject } from '@angular/core/testing';

import { CurrentuserinfoService } from './currentuserinfo.service';

describe('CurrentuserinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentuserinfoService]
    });
  });

  it('should be created', inject([CurrentuserinfoService], (service: CurrentuserinfoService) => {
    expect(service).toBeTruthy();
  }));
});

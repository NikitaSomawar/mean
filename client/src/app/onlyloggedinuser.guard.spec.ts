import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyloggedinuserGuard } from './onlyloggedinuser.guard';

describe('OnlyloggedinuserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyloggedinuserGuard]
    });
  });

  it('should ...', inject([OnlyloggedinuserGuard], (guard: OnlyloggedinuserGuard) => {
    expect(guard).toBeTruthy();
  }));
});

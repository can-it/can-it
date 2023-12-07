import { TestBed } from '@angular/core/testing';

import { PolicyStore } from './policy-store.service';
import { PolicyState } from '@can-it/types';

describe('PolicyStore', () => {
  let service: PolicyStore;
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const executors = { get: jest.fn((value: PolicyState) => {}) };

  const ALLOW_EDIT_USER: PolicyState = {
    allow: [
      ['edit', 'user']
    ]
  };
  const EMPTY_PERMISSIONS: PolicyState = {
    allow: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyStore]
    });
    service = TestBed.inject(PolicyStore);
  });

  it('should have no initialization state', () => {
    service.get().subscribe(executors.get);
    service.set(ALLOW_EDIT_USER);

    expect(executors.get).toHaveBeenCalledWith(ALLOW_EDIT_USER);
    expect(executors.get).toHaveBeenCalledTimes(1);
  });

  it('should notify when the new permissions are updated', () => {
    service.get().subscribe(executors.get);
    service.set(ALLOW_EDIT_USER);
    service.set(EMPTY_PERMISSIONS);

    expect(executors.get).toHaveBeenCalledWith(EMPTY_PERMISSIONS);
    expect(executors.get).toHaveBeenCalledWith(ALLOW_EDIT_USER);
  });
});

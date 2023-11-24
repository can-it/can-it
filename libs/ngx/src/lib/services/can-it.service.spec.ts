import { TestBed } from '@angular/core/testing';

import { CanItService } from './can-it.service';
import { PolicyStore } from './policy-store.service';
import { Permission } from '../types/permission';

describe('NgxCanItService', () => {
  let service: CanItService;
  let store: PolicyStore;
  const DENY_PERMISSIONS: Permission[] = [
    ['delete', 'user']
  ];
  const ALLOW_PERMISSIONS: Permission[] = [
    ['edit', 'user'],
    ['delete', 'user'],
  ];

  let canSubscriber: (value: boolean) => void;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanItService,
        PolicyStore,
      ]
    });

    service = TestBed.inject(CanItService);
    store = TestBed.inject(PolicyStore);
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    canSubscriber = jest.fn((value: boolean) => {})
  });

  it('should allow when the request matches the allow permissions', () => {
    store.set({ allow: ALLOW_PERMISSIONS });
    service.can(['edit', 'user']).subscribe(canSubscriber);

    expect(canSubscriber).toHaveBeenCalledWith(true);
    expect(canSubscriber).toHaveBeenCalledTimes(1);
    expect(canSubscriber).toHaveBeenCalledWith(true);
    expect(canSubscriber).toHaveBeenCalledTimes(1);
  });

  it('should not allow when the request does not match the allow permissions', () => {
    store.set({ allow: ALLOW_PERMISSIONS });
    service.can(['undefined-action', 'undefined-resource']).subscribe(canSubscriber);

    expect(canSubscriber).toHaveBeenCalledWith(false);
    expect(canSubscriber).toHaveBeenCalledTimes(1);
  });

  it('should update the access permissions when they are updated', () => {
    service.can(['edit', 'user']).subscribe(canSubscriber);
    store.set({ allow: ALLOW_PERMISSIONS });
    store.set({ allow: [] });

    expect(canSubscriber).toHaveBeenCalledWith(true);
    expect(canSubscriber).toHaveBeenCalledWith(false);
    expect(canSubscriber).toHaveBeenCalledTimes(2);
  });

  it('should not allow if request matches deny permissions, even in "allow" permissions', () => {
    store.set({ allow: ALLOW_PERMISSIONS, deny: DENY_PERMISSIONS });
    service.can(['delete', 'user']).subscribe(canSubscriber);

    expect(canSubscriber).toHaveBeenCalledWith(false);
    expect(canSubscriber).toHaveBeenCalledTimes(1);
  });

});

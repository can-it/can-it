import { Inject, Injectable, Optional } from '@angular/core';
import { PolicyStore } from './policy-store.service';
import { Observable, map } from 'rxjs';
import { ACTION_COMPARATOR, RI_COMPARATOR } from '../constants/token';
import { CanIt } from '@can-it/core';
import { Comparator, Request } from '@can-it/types';

@Injectable({
  providedIn: 'root'
})
export class CanItService {
  private canIt$: Observable<CanIt>;

  constructor(
    @Inject(ACTION_COMPARATOR) @Optional() actionComparator: Comparator,
    @Inject(RI_COMPARATOR) @Optional() riComparator: Comparator,
    policyStore: PolicyStore,
  ) {
    this.canIt$ = policyStore.get().pipe(
      map(state => new CanIt(state, actionComparator, riComparator))
    );
  }

  allowTo(...request: Request) {
    return this.canIt$.pipe(
      map(canIt => canIt.allowTo(...request))
    );
  }
}

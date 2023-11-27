import { Inject, Injectable, Scope } from '@nestjs/common';
import { PolicyStore } from './policy-store.service';
import { Comparator } from '@can-it/types';
import { CanIt } from '@can-it/core';
import { COMPARATORS_TOKEN } from '../token';

@Injectable({ scope: Scope.REQUEST })
export class CanItService {
  private canIt: CanIt;

  constructor(
    policyStore: PolicyStore,
    @Inject(COMPARATORS_TOKEN) comparators: { action: Comparator, ri: Comparator }
  ) {
    this.canIt = new CanIt(policyStore.get() || { allow: [] }, comparators.action, comparators.ri)
  }

  allowTo(action: string, ri: string) {
    return this.canIt.allowTo(action, ri);
  }
}

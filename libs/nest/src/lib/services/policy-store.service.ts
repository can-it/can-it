import { PolicyState } from '@can-it/types';
import { Injectable, Scope } from '@nestjs/common';

type PolicyResolver = (prePolicy?: PolicyState) => PolicyState;
@Injectable({ scope: Scope.REQUEST })
export class PolicyStore {
  private policy?: PolicyState;

  public get() {
    return this.policy;
  }

  public set(policy: PolicyState) {
    this.policy = policy;
  }

  public update(policyResolver: PolicyResolver) {
    this.policy = policyResolver(this.policy);
  }
}

import { Inject, Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { PolicyStore } from '../services/policy-store.service';
import { POLICY_RESOLVER } from '../constants';
import { PolicyState } from '@can-it/types';

@Injectable({ scope: Scope.REQUEST })
export class LoadPolicyMiddleware implements NestMiddleware {
  constructor(
    private storeService: PolicyStore,
    @Inject(POLICY_RESOLVER) private policyResolver: (req: unknown) => PolicyState
  ) {}

  async use(req: unknown, _res: unknown, next: () => void) {
    this.storeService.set(await this.policyResolver(req))
    next();
  }
}

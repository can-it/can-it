import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CAN_IT, CAN_IT_INSTANCE, USE_POLICY_RESOLVER, USE_RI_RESOLVER } from '../constants';
import { CanItService } from '../services/can-it.service';
import { RiStore } from '../services/ri-store.service';
import { PolicyStore } from '../services/policy-store.service';
import { Request } from '@can-it/types';

@Injectable()
export class CanItGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private canIt: CanItService,
    private riStore: RiStore,
    private policyStore: PolicyStore
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.reflector.getAllAndOverride<Request>(
      CAN_IT,
      [context.getHandler(), context.getClass()]
    );
    if (!request) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const riResolver = this.reflector.getAllAndOverride(
      USE_RI_RESOLVER,
      [context.getHandler(), context.getClass()]
    );
    if (riResolver) {
      this.riStore.state = riResolver(req);
    }

    const policyResolver = this.reflector.getAllAndOverride(
      USE_POLICY_RESOLVER,
      [context.getHandler(), context.getClass()]
    );
    if (policyResolver) {
      this.policyStore.set(policyResolver(req));
    }

    req[CAN_IT_INSTANCE] = this.canIt;
    return this.canIt.allowTo(...request);
  }
}

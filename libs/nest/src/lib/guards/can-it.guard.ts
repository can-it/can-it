import { CanActivate, ExecutionContext, Inject, Injectable, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  CAN_IT,
  COMPARATORS,
  POLICY_RESOLVER,
  RI_RESOLVER,
} from '../constants';
import { Comparator, Request } from '@can-it/types';
import { CanIt } from '@can-it/core';
import { RiResolver } from '../models/ri-resolver';
import { PolicyResolver } from '../models/policy-resolver';

@Injectable()
export class CanItGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(POLICY_RESOLVER) private policyResolver: PolicyResolver,
    @Inject(RI_RESOLVER) @Optional() private moduleRiResolver?: RiResolver,
    @Inject(COMPARATORS) @Optional() private comparators?: { action?: Comparator, ri?: Comparator }
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.getCanItRequest(context);
    if (!request) {
      return true;
    }

    const canIt = new CanIt(this.getPolicy(context), this.comparators?.action, this.comparators?.ri);

    const req = this.getNestRequest(context);
    req[CAN_IT] = canIt.allowTo.bind(canIt);

    return canIt.allowTo(...request);
  }

  private getCanItRequest(
    context: ExecutionContext
  ): Request {
    const [action, ri] = this.reflector.getAllAndOverride(
      CAN_IT,
      [context.getHandler(), context.getClass()]
    );

    if (!ri) {
      const riResolver = this.getRiResolver(context);
      if (!riResolver) {
        throw new Error('There is no "RiResolver" provided. Please make sure you added somewhere in this module.')
      }

      return [action, riResolver(this.getNestRequest(context))];
    }

    if (typeof ri !== 'string') {
      return [action, ri(this.getNestRequest(context))];
    }

    return [action, ri];
  }

  private getRiResolver(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<RiResolver>(
      RI_RESOLVER,
      [context.getHandler(), context.getClass()]
    ) || this.moduleRiResolver;
  }

  private getPolicy(context: ExecutionContext) {
    const policyResolver = this.reflector.getAllAndOverride(
      POLICY_RESOLVER,
      [context.getHandler(), context.getClass()]
    ) || this.policyResolver;
    return policyResolver(this.getNestRequest(context));
  }

  private getNestRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}

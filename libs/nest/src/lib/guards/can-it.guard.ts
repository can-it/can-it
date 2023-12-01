import { CanActivate, ExecutionContext, Inject, Injectable, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  CAN_IT,
  CAN_IT_CONFIGURATION,
  POLICY_RESOLVER,
  RI_RESOLVER,
} from '../constants';
import { Request } from '@can-it/types';
import { CanIt } from '@can-it/core';
import { RiResolver } from '../models/ri-resolver';
import { CanItConfiguration } from '../models/configuration';

@Injectable()
export class CanItGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CAN_IT_CONFIGURATION) @Optional() private config?: CanItConfiguration
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.getCanItRequest(context);
    if (!request) {
      return true;
    }

    const canIt = new CanIt(
      this.getPolicy(context),
      this.config?.comparators?.action,
      this.config?.comparators?.ri
    );

    const req = this.getNestRequest(context);
    req[CAN_IT] = canIt.allowTo.bind(canIt);

    return canIt.allowTo(...request);
  }

  private getCanItRequest(
    context: ExecutionContext
  ): Request | undefined {
    const request = this.reflector.getAllAndOverride(
      CAN_IT,
      [context.getHandler(), context.getClass()]
    );

    if (!request) {
      return;
    }

    const [action, ri] = request;

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
    ) || this.config?.resolvers?.ri;
  }

  private getPolicy(context: ExecutionContext) {
    const policyResolver = this.reflector.getAllAndOverride(
      POLICY_RESOLVER,
      [context.getHandler(), context.getClass()]
    ) || this.config?.resolvers?.policy;
    return policyResolver(this.getNestRequest(context));
  }

  private getNestRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}

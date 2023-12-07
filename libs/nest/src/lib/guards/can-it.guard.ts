import { CanActivate, ExecutionContext, Inject, Injectable, Optional } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import {
  CAN_IT,
  CAN_IT_CONFIGURATION
} from '../constants';
import { Request } from '@can-it/types';
import { CanIt } from '@can-it/core';
import { CanItConfiguration } from '../models/configuration';
import { getRiResolverDecorator } from '../decorators/use-ri-resolver.decorator';
import { getPolicyResolverDecorator } from '../decorators/use-policy-resolver.decorator';
import { getAllowToDecorator } from '../decorators/allow-to.decorator';

@Injectable()
export class CanItGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
    @Inject(CAN_IT_CONFIGURATION) @Optional() private config?: CanItConfiguration
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const canItRequest = await this.getCanItRequest(context);
    if (!canItRequest) {
      return true;
    }

    const canIt = new CanIt(
      await this.getPolicy(context),
      this.config?.comparators?.action,
      this.config?.comparators?.ri
    );

    const req = context.switchToHttp().getRequest();
    req[CAN_IT] = canIt;

    return canIt.allowTo(...canItRequest);
  }

  private async getCanItRequest(
    context: ExecutionContext
  ): Promise<Request | undefined> {
    const request = getAllowToDecorator(this.reflector, context);

    if (!request) {
      return;
    }

    const [action, ri] = request;

    if (!ri) {
      const riResolver = this.getRiResolver(context);
      if (!riResolver) {
        throw new Error('There is no "RiResolver" provided. Please make sure you added somewhere in this module.')
      }

      return [action, await riResolver(context, this.moduleRef)];
    }

    if (typeof ri !== 'string') {
      return [action, await ri(context, this.moduleRef)];
    }

    return [action, ri];
  }

  private getRiResolver(context: ExecutionContext) {
    return getRiResolverDecorator(this.reflector, context) || this.config?.resolvers?.ri;
  }

  private getPolicy(context: ExecutionContext) {
    const policyResolver = this.getPolicyResolver(context);

    if (!policyResolver) {
      throw new Error('There is no "PolicyResolver" provided. Please make sure you added somewhere in this module.')
    }

    return policyResolver(context, this.moduleRef);
  }

  private getPolicyResolver(context: ExecutionContext) {
    return getPolicyResolverDecorator(this.reflector, context) || this.config?.resolvers?.policy;
  }
}

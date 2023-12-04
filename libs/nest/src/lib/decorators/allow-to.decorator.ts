import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CAN_IT } from '../constants';
import { CanIt } from '@can-it/core';

export const AllowTo = createParamDecorator<unknown, ExecutionContext, CanIt['allowTo']>(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const canIt = req[CAN_IT] as CanIt;

    if (!canIt) {
      throw new Error('Please make sure this "AllowTo" decorator is using in the CanItGuard context')
    }

    return canIt.allowTo.bind(canIt);
  }
)

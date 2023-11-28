import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CAN_IT } from '../constants';
import { CanIt } from '@can-it/core';

export const AllowTo = createParamDecorator<unknown, ExecutionContext, CanIt['allowTo']>(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const canIt = req[CAN_IT] as CanIt;

    return canIt.allowTo.bind(canIt);
  }
)

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CAN_IT_INSTANCE } from '../constants';
import { CanIt } from '@can-it/core';

export const AllowTo = createParamDecorator<unknown, ExecutionContext, CanIt['allowTo']>(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const canIt = req[CAN_IT_INSTANCE] as CanIt;

    return canIt.allowTo.bind(canIt);
  }
)

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CAN_IT_INSTANCE } from '../constants';
import { CanItService } from '../services/can-it.service';

export const AllowTo = createParamDecorator<unknown, ExecutionContext, CanItService['allowTo']>(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const canIt = req[CAN_IT_INSTANCE] as CanItService;

    return canIt.allowTo.bind(canIt);
  }
)

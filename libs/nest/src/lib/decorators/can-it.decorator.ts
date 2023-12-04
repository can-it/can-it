import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { CAN_IT } from '../constants';
import { RiResolver } from '../models/ri-resolver';
import { Reflector } from '@nestjs/core';

export const CanIt = (
  action: string,
  ri?: string | RiResolver
) => SetMetadata(CAN_IT, [action, ri]);

export const getCanItDecorator = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride<[string, string | RiResolver | undefined] | undefined>(
    CAN_IT,
    [context.getHandler(), context.getClass()]
  );

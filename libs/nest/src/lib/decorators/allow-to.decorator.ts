import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { CAN_IT } from '../constants';
import { Reflector } from '@nestjs/core';
import { RiResolver } from '../models/ri-resolver';

export const AllowTo = (
  action: string,
  ri?: string | RiResolver
) => SetMetadata(CAN_IT, [action, ri]);

export const getAllowToDecorator = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride<[string, string | RiResolver | undefined] | undefined>(
    CAN_IT,
    [context.getHandler(), context.getClass()]
  );

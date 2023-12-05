import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { RI_RESOLVER } from '../constants';
import { RiResolver } from '../models/ri-resolver';
import { Reflector } from '@nestjs/core';

export const UseRiResolver = (resolver: RiResolver) => SetMetadata<string, RiResolver>(RI_RESOLVER, resolver);

export const getRiResolverDecorator = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride<RiResolver | undefined>(
    RI_RESOLVER,
    [context.getHandler(), context.getClass()]
  )

import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { POLICY_RESOLVER } from '../constants';
import { PolicyResolver } from '../models/policy-resolver';
import { Reflector } from '@nestjs/core';

export const UsePolicyResolver = (resolver: PolicyResolver) =>
  SetMetadata<string, PolicyResolver>(POLICY_RESOLVER, resolver);

export const getPolicyResolverDecorator = (reflector: Reflector, context: ExecutionContext) =>
  reflector.getAllAndOverride<PolicyResolver | undefined>(
    POLICY_RESOLVER,
    [context.getHandler(), context.getClass()]
  );

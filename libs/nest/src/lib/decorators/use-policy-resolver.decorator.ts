import { SetMetadata } from '@nestjs/common';
import { POLICY_RESOLVER } from '../constants';
import { PolicyResolver } from '../models/policy-resolver';

export const UsePolicyResolver = (resolver: PolicyResolver) => SetMetadata(POLICY_RESOLVER, resolver);

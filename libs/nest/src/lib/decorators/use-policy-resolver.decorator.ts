import { SetMetadata } from '@nestjs/common';
import { PolicyState } from '@can-it/types';
import { USE_POLICY_RESOLVER } from '../constants';

export const UsePolicyResolver = (resolver: (req: unknown) => PolicyState) =>
  SetMetadata(USE_POLICY_RESOLVER, resolver);

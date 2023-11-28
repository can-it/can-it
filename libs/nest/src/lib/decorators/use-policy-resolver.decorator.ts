import { SetMetadata } from '@nestjs/common';
import { PolicyState } from '@can-it/types';
import { POLICY_RESOLVER } from '../constants';

export const UsePolicyResolver = (resolver: (req: unknown) => PolicyState) =>
  SetMetadata(POLICY_RESOLVER, resolver);

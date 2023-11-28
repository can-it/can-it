import { SetMetadata } from '@nestjs/common';
import { PolicyState } from '@can-it/types';

export const UsePolicyResolver = (resolver: (req: unknown) => PolicyState) =>
  SetMetadata('use-policy-resolver', resolver);

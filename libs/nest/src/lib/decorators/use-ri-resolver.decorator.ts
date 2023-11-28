import { SetMetadata } from '@nestjs/common';
import { ResourceState } from '@can-it/types';
export const UseRiResolver = (resolver: <T>(req: unknown) => ResourceState<T>) =>
  SetMetadata('use-ri-resolver', resolver);

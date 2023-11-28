import { SetMetadata } from '@nestjs/common';
import { ResourceState } from '@can-it/types';
import { USE_RI_RESOLVER } from '../constants';

export const UseRiResolver = (resolver: <T>(req: unknown) => ResourceState<T>) =>
  SetMetadata(USE_RI_RESOLVER, resolver);

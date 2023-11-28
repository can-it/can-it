import { SetMetadata } from '@nestjs/common';
import { ResourceState } from '@can-it/types';
import { RI_RESOLVER } from '../constants';

export const UseRiResolver = (resolver: <T>(req: unknown) => ResourceState<T>) =>
  SetMetadata(RI_RESOLVER, resolver);

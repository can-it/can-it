import { Comparator } from '@can-it/types';
import { RiResolver } from './ri-resolver';
import { PolicyResolver } from './policy-resolver';

export interface CanItConfiguration {
  comparators?: { action?: Comparator, ri?: Comparator },
  resolvers?: { ri: RiResolver, policy?: PolicyResolver }
}

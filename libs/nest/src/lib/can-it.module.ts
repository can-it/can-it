import { Comparator } from '@can-it/types';
import { DynamicModule, Module } from '@nestjs/common';
import { COMPARATORS, POLICY_RESOLVER, RI_RESOLVER } from './constants';
import { RiResolver } from './models/ri-resolver';
import { PolicyResolver } from './models/policy-resolver';

export interface CanItConfiguration {
  comparators?: { action?: Comparator, ri?: Comparator },
  resolvers?: { ri?: RiResolver, policy?: PolicyResolver }
}

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CanItModule {
  static register(config: CanItConfiguration): DynamicModule {
    const { comparators, resolvers } = config;

    return {
      module: CanItModule,
      providers: [
        { provide: COMPARATORS, useValue: comparators },
        { provide: POLICY_RESOLVER, useValue: resolvers?.policy },
        { provide: RI_RESOLVER, useValue: resolvers?.ri }
      ]
    }
  }

  static forChild(): DynamicModule {
    return {
      module: CanItModule
    }
  }
}

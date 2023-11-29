import { Comparator } from '@can-it/types';
import { Module, Provider } from '@nestjs/common';
import { COMPARATORS, POLICY_RESOLVER, RI_RESOLVER } from './constants';
import { RiResolver } from './models/ri-resolver';
import { PolicyResolver } from './models/policy-resolver';
import { APP_GUARD } from '@nestjs/core';
import { CanItGuard } from './guards/can-it.guard';

export interface CanItConfiguration {
  comparators?: { action?: Comparator, ri?: Comparator },
  resolvers: { ri?: RiResolver, policy: PolicyResolver }
}

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CanItModule {
  static withProviders(config: CanItConfiguration): Provider[] {
    const { comparators, resolvers } = config;

    return [
      { provide: COMPARATORS, useValue: comparators },
      { provide: POLICY_RESOLVER, useValue: resolvers.policy },
      { provide: RI_RESOLVER, useValue: resolvers.ri }
    ];
  }

  static registerAppGuard(): Provider {
    return {
      provide: APP_GUARD,
      useClass: CanItGuard
    };
  }
}

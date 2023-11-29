import { Comparator } from '@can-it/types';
import { DynamicModule, Module } from '@nestjs/common';
import { COMPARATORS, POLICY_RESOLVER, RI_RESOLVER } from './constants';
import { RiResolver } from './models/ri-resolver';
import { PolicyResolver } from './models/policy-resolver';
import { CanItGuard } from './guards/can-it.guard';

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
      ],
      // Guards are not providers. Ref: https://github.com/nestjs/nest/issues/3856#issuecomment-575879084
      exports: [CanItGuard]
    }
  }

  static forChild(): DynamicModule {
    return {
      module: CanItModule
    }
  }
}

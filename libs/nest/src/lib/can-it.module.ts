import { Module, Provider } from '@nestjs/common';
import { CanItConfiguration } from './models/configuration';
import { CAN_IT_CONFIGURATION } from './constants';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CanItModule {
  static configure(options: CanItConfiguration): Provider {
    return {
      provide: CAN_IT_CONFIGURATION,
      useValue: options
    }
  }
}

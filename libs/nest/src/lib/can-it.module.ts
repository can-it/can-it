import { Module } from '@nestjs/common';
import { PolicyStore } from './services/policy-store.service';
import { CanItService } from './services/can-it.service';
import { RiStore } from './services/ri-store.service';

@Module({
  controllers: [],
  providers: [PolicyStore, CanItService, RiStore],
  exports: [],
})
export class CanItModule {}

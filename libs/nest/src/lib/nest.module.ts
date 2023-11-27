import { Module } from '@nestjs/common';
import { PolicyStore } from './services/policy-store.service';
import { CanItService } from './services/can-it.service';

@Module({
  controllers: [],
  providers: [PolicyStore, CanItService],
  exports: [],
})
export class NestModule {}

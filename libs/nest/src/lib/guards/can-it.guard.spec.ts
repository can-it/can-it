import { Reflector } from '@nestjs/core';
import { CanItGuard } from './can-it.guard';
import { Test } from '@nestjs/testing';

describe('CanItGuard', () => {
  it('should be defined', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        Reflector,
        CanItGuard
      ]
    }).compile();

    expect(moduleRef.get(CanItGuard)).toBeDefined();
  });
});

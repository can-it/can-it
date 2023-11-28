import { Test, TestingModule } from '@nestjs/testing';
import { RiStore } from './ri-store.service';

describe('RiStoreService', () => {
  let service: RiStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiStore],
    }).compile();

    service = module.get<RiStore>(RiStore);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

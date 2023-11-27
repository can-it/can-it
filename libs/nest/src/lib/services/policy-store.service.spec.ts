import { Test, TestingModule } from '@nestjs/testing';
import { PolicyStore } from './policy-store.service';

describe('PolicyStoreService', () => {
  let service: PolicyStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicyStore],
    }).compile();

    service = module.get<PolicyStore>(PolicyStore);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

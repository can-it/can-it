import { Test, TestingModule } from '@nestjs/testing';
import { CanItService } from './can-it.service';

describe('CanItService', () => {
  let service: CanItService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanItService],
    }).compile();

    service = module.get<CanItService>(CanItService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

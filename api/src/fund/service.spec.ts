import { Test, TestingModule } from '@nestjs/testing';
import { FundService } from './service';

describe('FundService', () => {
  let service: FundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundService],
    }).compile();

    service = module.get<FundService>(FundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

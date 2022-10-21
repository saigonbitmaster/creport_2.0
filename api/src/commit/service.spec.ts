import { Test, TestingModule } from '@nestjs/testing';
import { GitCommitService } from './service';

describe('GitCommitService', () => {
  let service: GitCommitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitCommitService],
    }).compile();

    service = module.get<GitCommitService>(GitCommitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

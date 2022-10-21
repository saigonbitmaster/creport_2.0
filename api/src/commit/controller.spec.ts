import { Test, TestingModule } from '@nestjs/testing';
import { GitCommitController } from './controller';

describe('GitCommitController', () => {
  let controller: GitCommitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitCommitController],
    }).compile();

    controller = module.get<GitCommitController>(GitCommitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

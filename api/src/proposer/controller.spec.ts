import { Test, TestingModule } from '@nestjs/testing';
import { ProposerController } from './controller';

describe('ProposerController', () => {
  let controller: ProposerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposerController],
    }).compile();

    controller = module.get<ProposerController>(ProposerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

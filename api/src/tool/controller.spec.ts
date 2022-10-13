import { Test, TestingModule } from '@nestjs/testing';
import { FundController } from './controller';

describe('FundController', () => {
  let controller: FundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundController],
    }).compile();

    controller = module.get<FundController>(FundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

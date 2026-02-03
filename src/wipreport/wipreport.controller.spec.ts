import { Test, TestingModule } from '@nestjs/testing';
import { WipreportController } from './wipreport.controller';

describe('WipreportController', () => {
  let controller: WipreportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WipreportController],
    }).compile();

    controller = module.get<WipreportController>(WipreportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

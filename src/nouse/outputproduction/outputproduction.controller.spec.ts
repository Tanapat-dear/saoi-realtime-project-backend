import { Test, TestingModule } from '@nestjs/testing';
import { OutputproductionController } from './outputproduction.controller';
import { OutputproductionService } from './outputproduction.service';

describe('OutputproductionController', () => {
  let controller: OutputproductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutputproductionController],
      providers: [OutputproductionService],
    }).compile();

    controller = module.get<OutputproductionController>(OutputproductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

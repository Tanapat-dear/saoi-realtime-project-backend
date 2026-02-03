import { Test, TestingModule } from '@nestjs/testing';
import { WeblayoutController } from './weblayout.controller';
import { WeblayoutService } from './weblayout.service';

describe('WeblayoutController', () => {
  let controller: WeblayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeblayoutController],
      providers: [WeblayoutService],
    }).compile();

    controller = module.get<WeblayoutController>(WeblayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

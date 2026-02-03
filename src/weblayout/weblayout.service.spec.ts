import { Test, TestingModule } from '@nestjs/testing';
import { WeblayoutService } from './weblayout.service';

describe('WeblayoutService', () => {
  let service: WeblayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeblayoutService],
    }).compile();

    service = module.get<WeblayoutService>(WeblayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

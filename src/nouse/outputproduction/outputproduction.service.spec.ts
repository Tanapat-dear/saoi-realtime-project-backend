import { Test, TestingModule } from '@nestjs/testing';
import { OutputproductionService } from './outputproduction.service';

describe('OutputproductionService', () => {
  let service: OutputproductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutputproductionService],
    }).compile();

    service = module.get<OutputproductionService>(OutputproductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

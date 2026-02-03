import { Test, TestingModule } from '@nestjs/testing';
import { WipreportService } from './wipreport.service';

describe('WipreportService', () => {
  let service: WipreportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WipreportService],
    }).compile();

    service = module.get<WipreportService>(WipreportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DayjsserviceService } from './dayjsservice.service';

describe('DayjsserviceService', () => {
  let service: DayjsserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayjsserviceService],
    }).compile();

    service = module.get<DayjsserviceService>(DayjsserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

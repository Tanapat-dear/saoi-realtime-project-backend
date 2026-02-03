import { Test, TestingModule } from '@nestjs/testing';
import { RealtimestatusService } from './realtimestatus.service';

describe('RealtimestatusService', () => {
  let service: RealtimestatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealtimestatusService],
    }).compile();

    service = module.get<RealtimestatusService>(RealtimestatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

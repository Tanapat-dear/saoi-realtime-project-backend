import { Test, TestingModule } from '@nestjs/testing';
import { RealtimestatusController } from './realtimestatus.controller';
import { RealtimestatusService } from './realtimestatus.service';

describe('RealtimestatusController', () => {
  let controller: RealtimestatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealtimestatusController],
      providers: [RealtimestatusService],
    }).compile();

    controller = module.get<RealtimestatusController>(RealtimestatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

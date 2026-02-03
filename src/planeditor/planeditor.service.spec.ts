import { Test, TestingModule } from '@nestjs/testing';
import { PlaneditorService } from './planeditor.service';

describe('PlaneditorService', () => {
  let service: PlaneditorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaneditorService],
    }).compile();

    service = module.get<PlaneditorService>(PlaneditorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

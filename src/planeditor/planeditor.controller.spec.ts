import { Test, TestingModule } from '@nestjs/testing';
import { PlaneditorController } from './planeditor.controller';

describe('PlaneditorController', () => {
  let controller: PlaneditorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaneditorController],
    }).compile();

    controller = module.get<PlaneditorController>(PlaneditorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

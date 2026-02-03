import { Test, TestingModule } from '@nestjs/testing';
import { OeeController } from './oee.controller';

describe('OeeController', () => {
  let controller: OeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OeeController],
    }).compile();

    controller = module.get<OeeController>(OeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

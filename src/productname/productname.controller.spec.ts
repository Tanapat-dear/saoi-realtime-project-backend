import { Test, TestingModule } from '@nestjs/testing';
import { ProductnameController } from './productname.controller';

describe('ProductnameController', () => {
  let controller: ProductnameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductnameController],
    }).compile();

    controller = module.get<ProductnameController>(ProductnameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductnameService } from './productname.service';

describe('ProductnameService', () => {
  let service: ProductnameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductnameService],
    }).compile();

    service = module.get<ProductnameService>(ProductnameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

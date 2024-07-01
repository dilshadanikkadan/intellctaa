import { Test, TestingModule } from '@nestjs/testing';
import { ExcutionService } from './excution.service';

describe('ExcutionService', () => {
  let service: ExcutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcutionService],
    }).compile();

    service = module.get<ExcutionService>(ExcutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

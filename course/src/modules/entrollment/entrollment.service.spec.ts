import { Test, TestingModule } from '@nestjs/testing';
import { EntrollmentService } from './entrollment.service';

describe('EntrollmentService', () => {
  let service: EntrollmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrollmentService],
    }).compile();

    service = module.get<EntrollmentService>(EntrollmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

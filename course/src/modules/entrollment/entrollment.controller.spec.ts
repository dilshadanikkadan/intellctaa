import { Test, TestingModule } from '@nestjs/testing';
import { EntrollmentController } from './entrollment.controller';

describe('EntrollmentController', () => {
  let controller: EntrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrollmentController],
    }).compile();

    controller = module.get<EntrollmentController>(EntrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

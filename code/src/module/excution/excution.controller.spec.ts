import { Test, TestingModule } from '@nestjs/testing';
import { ExcutionController } from './excution.controller';

describe('ExcutionController', () => {
  let controller: ExcutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcutionController],
    }).compile();

    controller = module.get<ExcutionController>(ExcutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

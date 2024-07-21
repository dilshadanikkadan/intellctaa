import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CodeEXcuteDTO } from './dtos/code.excute.dto';
import { ExcutionService } from './excution.service';
import { RequireUserGuard } from 'src/guards/requireUser';

@Controller('excution')
export class ExcutionController {
  constructor(private readonly executionService: ExcutionService) {}

  @Post()
  @UseGuards(RequireUserGuard)
  public async excute(@Body() codeExcuteDto: CodeEXcuteDTO) {
    const { code, testCases, driver, language }: any = codeExcuteDto;

    try {
      const result = await this.executionService.excute(
        code,
        testCases,
        driver,
        language,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while executing the code',
      );
    }
  }
}

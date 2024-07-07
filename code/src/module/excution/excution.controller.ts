import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CodeEXcuteDTO } from './dtos/code.excute.dto';
import { ExcutionService } from './excution.service';

@Controller('excution')
export class ExcutionController {
  constructor(private readonly executionService: ExcutionService) {}

  @Post()
  async excute(@Body() codeExcuteDto: CodeEXcuteDTO) {
    const { code,testCases ,driver,language}:any = codeExcuteDto;
    // console.log(testCases);
    
    
    try {
      const result = await this.executionService.excute(code,testCases,driver,language);
      return result
    } catch (error) {
      // console.error("Error executing code:", error);
      throw new BadRequestException(error.message || 'An error occurred while executing the code');
    }
  }
}     
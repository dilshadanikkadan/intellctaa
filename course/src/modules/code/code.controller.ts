import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { codeExcuteDTO } from './dtos/code.excute.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { promises as fs ,readdirSync} from 'fs';
const PROBLEMS_DIR = join(process.cwd(), '..', 'problems');
@Controller('')
export class CodeController {
  constructor(private codeService: CodeService) {}

  private async readFile(basePath: string, fileName: string): Promise<any> {
    const filePath = join(basePath, fileName);
    return fs.readFile(filePath, 'utf8');
  }

  @Get('/getFile/:question/:language')
  getFile(@Res() res: Response, @Param() param: string) {
    const { question, language }: any = param;
    let fileExt;

    switch (language) {
      case 'javascript':
        fileExt = 'js';
        break;
      case 'python':
        fileExt = 'py';

      default:
        fileExt = 'py';
    }
 
    const file = createReadStream(
      join(
        `${PROBLEMS_DIR}/${question}/languages/${language}/solution.template.${fileExt}`,
      ),
    );
    
    return file.pipe(res);
  }

  @Post('/codeExcute')
  async excute(@Body() payload: codeExcuteDTO) {
    const { code, question = 'add_num_001', language,problemType="array" } = payload;
    
    let fileExt;

    switch (language) {
      case 'javascript':
        fileExt = 'js';
        break;
      case 'python':
        fileExt = 'py';

      default:
        fileExt = 'py';
    }
    const basePath_Question = join(
      PROBLEMS_DIR,
      question,
      'languages',
      language,
    );

    const [driver, testCases, expectedOut] = await Promise.all([
      this.readFile(basePath_Question, `driver.${fileExt}`),
      this.readFile(basePath_Question, 'test.case.txt'),
      this.readFile(basePath_Question, 'output.txt'),
    ]);

    const allTestCases = testCases.split('__').map((test) => test.trim());
    const allExpectedOut = expectedOut.split('__').map((x) => x.trim());
    const runCode = `
    ${code}
    `;

    
    const outPut_exc= await this.codeService.codeRequestApi(runCode, allTestCases, driver,language);
    console.log("____________________________________________________________________");
    console.log(expectedOut.split('__').join(""));
    console.log(outPut_exc);
    console.log("____________________________________________________________________");
    return this.codeService.testCode(outPut_exc,allExpectedOut,problemType)

    
  }
@Get('/getAllQuestion')
  getAllQuestion(){
    const allProblems = readdirSync(PROBLEMS_DIR)
     return allProblems.filter((x)=> /\d/.test(x))
  }
}

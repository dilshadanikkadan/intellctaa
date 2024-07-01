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
import axios from 'axios';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { promises as fs } from 'fs';
@Controller('')
export class CodeController {
  constructor(private codeService: CodeService) {}

  @Get('/getFile/:question/:language')
  getFile(@Res() res: Response, @Param() param: string) {
    console.log('++++++++++++++reached', param);
    const { question, language }: any = param;

    const file = createReadStream(
      join(
        process.cwd(),
        '..',
        `/problems/${question}/languages/${language}/solution.template.js`,
      ),
    );
    return file.pipe(res);
  }

  @Post('/codeExcute')
  async excute(@Body() payload: codeExcuteDTO) {
    const { code } = payload;

    const driverPath = join(
      process.cwd(),
      '..',
      `/problems/add_num_001/languages/javascript/driver.js`,
    );
    const testPaths = join(
      process.cwd(),
      '..',
      `/problems/add_num_001/languages/javascript/test.case.txt`,
    );

    const expectedOutPutPath = join(
      process.cwd(),
      '..',
      `/problems/add_num_001/languages/javascript/output.txt`,
    );

    const driver = await fs.readFile(driverPath, 'utf8');
    const testCases = await fs.readFile(testPaths, 'utf8');
    const expectedOut = await fs.readFile(expectedOutPutPath, 'utf8');
    const allTestCases = testCases.split('__').map((test) => test.trim())
    const allExpectedOut = expectedOut.split('__').map((x) => Number(x.trim()));
    console.log(
      '_______________________________________________________________',
    );
    console.log(allTestCases);
    console.log(
      '_______________________________________________________________',
    );

    const runCode = `
${code}
`;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/code/excution',
        { code: runCode, testCases: allTestCases, driver },
        {
          withCredentials: true,
        },
      );
      console.log("*************%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      let result =[]
      console.log(response.data.map(x=> x.output))
      
      console.log("*************%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new BadRequestException(error.response.data);
      } else if (error.request) {
        throw new BadRequestException(
          'No response received from execution server',
        );
      } else {
        throw new BadRequestException('Error setting up the request');
      }
    }
  }
}

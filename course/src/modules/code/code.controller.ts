import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { codeExcuteDTO } from './dtos/code.excute.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { promises as fs, readdirSync } from 'fs';
import { RequireAdminGuard } from 'src/guards/requireAdmin';
import { RequireUserGuard } from 'src/guards/requireUser';
import axios from 'axios';
import { BASE_PATH, GITHUB_TOKEN, GITHUB_USERNAME } from './constant/code.constant';
import { ConfigService } from '@nestjs/config';
const PROBLEMS_DIR = join(process.cwd(), '..', 'problems');
@Controller('')
export class CodeController {

  constructor(private codeService: CodeService,private configSrv:ConfigService) {}

  private async readFile( fileName?: string): Promise<any> {
    try {
      console.log("________this is file",fileName);
      
      const repo = 'problmes';
      const path = 'add_num_.md';
      const response = await axios.get(`https://api.github.com/repos/${this.configSrv.get<string>('GITHUB_USERNAME')}/${repo}/contents/${fileName}`, {
          headers: {
              'Authorization': `token ${this.configSrv.get<string>('GITHUB_SECRET')}`,
              'Accept': 'application/vnd.github.v3.raw'
          }
    });
    return response.data
    } catch (error) {
      //  console.log(error);
    } 

  }

  @Get('/getFile/:question/:language')
  async getFile(@Res() res: Response, @Param() param: string) {
    console.log(param);

    const { question, language }: any = param;
    let fileExt;
    console.log('$$$$$$$$$$$***', language);
    console.log('$$$$$$$$$$$***', fileExt);
    switch (language) {
      case 'javaScript':
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

    const readMdFile = question.replace(/\d/g, '');
    const [driver,testCases,expectedOut,readMd,solutionTemplate] =
      await Promise.all([
        this.readFile( `${question}/languages/${language}/driver.${fileExt}`),
        this.readFile( `${question}/languages/${language}/test.case.txt`),
        this.readFile( `${question}/languages/${language}/output.txt`),
        this.readFile(`${question}/${question}/${readMdFile}.md`),
        this.readFile( `${question}/languages/${language}/solution.template.${fileExt}`),
      ]);

    res
      .status(200)
      .json([
        { driver },
        { testCases },
        { expectedOut },
        { readMd },
        { solutionTemplate },
      ]);
  }

  @Post('/codeExcute')
  public async excute(@Body() payload: codeExcuteDTO) {
    try {
      const { code, question, language, problemType } = payload;

      let fileExt;
      console.log('#####################)))', question);

      switch (language) {
        case 'javaScript':
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
        this.readFile( `${question}/languages/${language}/driver.${fileExt}`),
        this.readFile( `${question}/languages/${language}/test.case.txt`),
        this.readFile( `${question}/languages/${language}/output.txt`),
      ]);

      const allTestCases = testCases.split('__').map((test) => test.trim());
      const allExpectedOut = expectedOut.split('__').map((x) => x.trim());
      const runCode = `
      ${code} 
      `;

      const outPut_exc = await this.codeService.codeRequestApi(
        runCode,
        allTestCases,
        driver,
        language,
      );
      console.log(
        '____________________________________________________________________**',
      );
      console.log(outPut_exc);
      console.log(
        '____________________________________________________________________**',
      );
      const response = this.codeService.testCode(
        outPut_exc,
        allExpectedOut,
        problemType,
      );
      if (response[0]?.result?.error) {
        console.log('entered to errror ', response[0]?.error);

        throw new BadRequestException(response[0]?.result?.error);
        
      }
      
      
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('/getAllQuestion')
  @UseGuards(RequireUserGuard)
  getAllQuestion() {
    const allProblems = readdirSync(PROBLEMS_DIR);
    return allProblems.filter((x) => /\d/.test(x));
  }
}

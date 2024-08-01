import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CodeService {
  async codeRequestApi(runCode, allTestCases, driver, language) {
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/code/excution',
        { code: runCode, testCases: allTestCases, driver, language },
        {
          withCredentials: true,
        },
      );
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

  testCode(output: any, tests: any,problemType:any) {
    let result = [];
    console.log(output);
    console.log(tests);
    const all_outPut = output
    function rmSymbol(str) {
      return str.replace(/['"]/g, '');
    }

  

    for (let i = 0; i < 3; i++) {
      result.push({
        testCase: i + 1,
        output: all_outPut[i] == rmSymbol(tests[i]),
        result:all_outPut[i],
        expected:rmSymbol(tests[i])
      });
    }

    return result;
  }
}



import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { spawn } from 'child_process';

@Processor('code-execution')
export class CodeExecutionProcessor {
  private readonly logger = new Logger(CodeExecutionProcessor.name);

  @Process('execute')
  async handleExecution(
    job: Job<{
      code: string;
      testCases: string[];
      driver: string;
      language: string;
    }>,
  ) {
    this.logger.debug('Start executing code...');

    const { code, testCases, driver, language } = job.data;
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^neymar', language);

    // if (language !== 'python') {
    //   throw new Error('Unsupported language');
    // }

    const executionCode = this.generateExecutionCode(code, driver, testCases);

    this.logger.debug('Execution code:\n' + testCases);
    let results;
    try {
      if (language === 'python') {
        results = await this.runPythonCode(executionCode);
      } else {
        results = await this.runJavaScriptCode(code, testCases, driver);
      }
      return results;
    } catch (error) {
      this.logger.error('Code execution failed:', error.message);
      throw error;
    }
  }
  private generateExecutionCode(
    code: string,
    driver: string,
    testCases: string[],
  ): string {
    const formattedTestCases = testCases.map((testCase) =>
      testCase.split(',').map((item) => Number(item.trim())),
    );

    const pythonTestCases = JSON.stringify(formattedTestCases)
      .replace(/"/g, "'")
      .replace(/\[/g, '(')
      .replace(/\]/g, ')');

  
    const isTestArray_ = testCases[0].startsWith('[');
    const isTeststring = testCases[0].startsWith(`"`);
    const newTest = testCases.map((item) => item.replace(/"/g, ''));
   
   
    if (isTeststring) {
      return `
${code}
res_=[]
for case in(${testCases}):
    res_.append(${driver}(case))
print(res_)   
    `.trim();
    }
    if (isTestArray_) {

      return `
${code}
res_=[]
for case in(${testCases}):
    res_.append(${driver}(case))
print(res_)   
   `.trim();
    }
    return `
${code}   
res_=[]
for case in(${pythonTestCases}):
    res_.append(${driver}(*case)) 
print(res_)         
  `.trim();
  }

  private runPythonCode(executionCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn('python3', ['-c', executionCode]);
      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        this.logger.debug('Process closed with code:', code);
        this.logger.debug('Full output:\n' + output);

        if (errorOutput) {
          this.logger.debug('Error output:\n' + errorOutput);
        }

        if (code === 0) {
          this.logger.debug('Code execution completed successfully');
          resolve(output);
          console.log('_____', output);
        } else {
          reject(
            new Error(
              `Execution failed with code ${code}: ${errorOutput || output}`,
            ),
          );
        }
      });

      process.on('error', (err) => {
        reject(new Error(`Failed to start process: ${err.message}`));
      });
    });
  }

  private runJavaScriptCode(
    code: string,
    testCases: string[],
    driver: string,
  ): Promise<string> {
    const isString = testCases[0].startsWith('"');
    const formattedTestCases = testCases.map(x => x.replace(/^"|"$/g, ''));
    let executionCode;

    if (isString) {
      executionCode = `
      ${code}

      ${driver}  

      const results = [];
      ${formattedTestCases
        .map(
          (testCase, index) => `
      try {
        const result = ${driver}('${testCase}');
        results.push(result);
      } catch (error) {
        results.push({ case: ${index + 1}, input: "${testCase}", error: error.message });
      }
      `,
        )
        .join('\n')}

      console.log(JSON.stringify(results));
    `;
    } else {
      executionCode = `
      ${code}

      ${driver}  

      const results = [];
      ${testCases
        .map(
          (testCase, index) => `
      try {
        const result = ${driver}(${testCase});
        results.push(result);
      } catch (error) {
        results.push({ case: ${index + 1}, input: "${testCase}", error: error.message });
      }
      `,
        )
        .join('\n')}

      console.log(JSON.stringify(results));
    `;
    }

    return new Promise((resolve, reject) => {
      const process = spawn('node', ['-e', executionCode]);
      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          this.logger.debug(`Code execution completed`);
          try {
            const results = JSON.parse(output);
            resolve(results);
          } catch (error) {
            reject(
              new Error(`Failed to parse execution results: ${error.message}`),
            );
          }
        } else {
          this.logger.error(`Code execution failed: ${errorOutput}`);
          reject(
            new Error(
              `Execution failed with code ${code}: ${errorOutput || output}`,
            ),
          );
        }
      });

      process.on('error', (err) => {
        this.logger.error(`Failed to start process: ${err.message}`);
        reject(new Error(`Failed to start process: ${err.message}`));
      });
    });
  }
}

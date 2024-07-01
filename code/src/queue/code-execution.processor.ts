import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { spawn } from 'child_process';

@Processor('code-execution')
export class CodeExecutionProcessor {
  private readonly logger = new Logger(CodeExecutionProcessor.name);

  @Process('execute')
  async handleExecution(job: Job<{ code: string, testCases: string[], driver: string }>) {
    this.logger.debug('Start executing code...');
    const { code, testCases, driver } = job.data;
  console.log("_______________________________________________________");
  console.log(testCases);
  console.log("_______________________________________________________");
  
    const executionCode = `
      ${code}
  
      ${driver}
   
      const results = [];
      ${testCases.map((testCase, index) => `
      try {
        const result = add(${testCase});
        results.push({ case: ${index + 1}, input: "${testCase}", output: result});
      } catch (error) {
        results.push({ case: ${index + 1}, input: "${testCase}", error: error.message });
      }
      `).join('\n')}
  
      console.log(JSON.stringify(results));
    `;
  
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
            reject(new Error(`Failed to parse execution results: ${error.message}`));
          }
        } else {
          this.logger.error(`Code execution failed: ${errorOutput}`);
          reject(new Error(`Execution failed with code ${code}: ${errorOutput || output}`));
        }
      }); 
  
      process.on('error', (err) => {
        this.logger.error(`Failed to start process: ${err.message}`);
        reject(new Error(`Failed to start process: ${err.message}`));
      });
    });
  }
}
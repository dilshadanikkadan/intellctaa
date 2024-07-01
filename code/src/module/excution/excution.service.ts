import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { CodeExecutionQueue } from 'src/queue/code-execution.queue';

@Injectable()
export class ExcutionService {
  constructor(private codeExecutionQueue: CodeExecutionQueue) {}

  async excute(code: string,testCases:[],driver:string) {
    // console.log("Got code:", code);



    const job = await this.codeExecutionQueue.addJob(code,testCases,driver);
    console.log(job);
    
    return job
    // return new Promise((resolve, reject) => {
    //   const process = spawn('node', ['-e', code]);
    //   let output = '';
    //   let errorOutput = '';

    //   process.stdout.on('data', (data) => {
    //     output += data.toString();
    //   });

    //   process.stderr.on('data', (data) => {
    //     errorOutput += data.toString();
    //   });

    //   process.on('close', (code) => {
    //     if (code === 0) {
    //       console.log("Output:", output);
    //       resolve(output);
    //     } else {
    //       // console.error("Error output:", errorOutput);
    //       reject(new Error(`Execution failed with code ${code}: ${errorOutput || output}`));
    //     }
    //   });

    //   process.on('error', (err) => {
    //     console.error("Spawn error:", err);
    //     reject(new Error(`Failed to start process: ${err.message}`));
    //   });
    // });
  }
}

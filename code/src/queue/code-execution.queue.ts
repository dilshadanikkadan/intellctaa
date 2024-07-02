import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CodeExecutionQueue {
  constructor(
    @InjectQueue('code-execution') private codeExecutionQueue: Queue,
  ) {}

  async addJob(code: string,testCases:[],driver:string,language:string) {

  console.log("_______________________from add JOn",testCases);
  
    const job = await this.codeExecutionQueue.add('execute', { code,testCases,driver,language });
    const res = await job.finished();

    const result =
      (await job.getState()) === 'completed'
        ? job.returnvalue
        : { error: 'Job failed to execute' };
    console.log('_______________________________', res);

    return res;
  }

  async getJobResult(jobId: string) {
    const job = await this.codeExecutionQueue.getJob(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    const state = await job.getState();
    const result = job.returnvalue;

    return { jobId, state, result };
  }
}
 
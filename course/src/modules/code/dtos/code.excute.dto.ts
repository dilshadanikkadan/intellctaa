export interface codeExcuteDTO {
    code: string;
    testCases: [];
    language?:string;
    question?:string
    problemType?:"array"|"string"|"number"
  }
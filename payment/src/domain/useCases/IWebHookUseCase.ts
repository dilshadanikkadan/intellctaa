
export interface IWebHookUseCase{
    execute(data: any):Promise<any>;
}
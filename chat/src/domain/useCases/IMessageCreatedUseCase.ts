export interface IMessageCreatedUseCase{
    execute(data:any):Promise<any>;
}
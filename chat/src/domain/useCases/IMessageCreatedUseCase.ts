import { TOBE } from "@/_lib/constants/Tobe";

export interface IMessageCreatedUseCase{
    execute(data:TOBE):Promise<TOBE>;
}
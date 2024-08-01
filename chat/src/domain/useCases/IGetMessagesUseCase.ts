import { TOBE } from "@/_lib/constants/Tobe";

export interface IGetMessagesUseCase{
    execute(data:TOBE):Promise<TOBE>;
}
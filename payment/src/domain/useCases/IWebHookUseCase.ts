import { TOBE } from "@/_lib/constants/Tobe";

export interface IWebHookUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
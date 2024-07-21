import { TOBE } from "@/_lib/constants/Tobe";

export interface IUpdateProfileUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
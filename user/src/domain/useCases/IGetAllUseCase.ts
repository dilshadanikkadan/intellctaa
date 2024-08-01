import { TOBE } from "@/_lib/constants/Tobe";

export interface IGetAllUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
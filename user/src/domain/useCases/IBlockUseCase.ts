import { TOBE } from "@/_lib/constants/Tobe";

export interface IBlockUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
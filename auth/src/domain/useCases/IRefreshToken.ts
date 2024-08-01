import { TOBE } from "@/_lib/constants/Tobe";

export interface IRefreshTokenUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
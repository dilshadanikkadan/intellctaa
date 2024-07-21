import { TOBE } from "@/_lib/constants/Tobe";

export interface IUserCreatedUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
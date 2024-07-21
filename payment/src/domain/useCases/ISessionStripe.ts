import { TOBE } from "@/_lib/constants/Tobe";

export interface ISessionStripeUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
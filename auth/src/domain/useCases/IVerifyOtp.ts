import { TOBE } from "@/_lib/constants/Tobe";

export interface IVerifyOtpUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
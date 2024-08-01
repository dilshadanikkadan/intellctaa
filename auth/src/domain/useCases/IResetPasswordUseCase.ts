import { TOBE } from "@/_lib/constants/Tobe";

export interface IResetPasswordUseCase {
    execute(data: TOBE): Promise<TOBE>;
  }
  
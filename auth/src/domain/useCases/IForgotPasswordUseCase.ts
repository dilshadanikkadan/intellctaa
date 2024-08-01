import { TOBE } from "@/_lib/constants/Tobe";

export interface IForgotPasswordUseCase {
  execute(data: TOBE): Promise<TOBE>;
  
}

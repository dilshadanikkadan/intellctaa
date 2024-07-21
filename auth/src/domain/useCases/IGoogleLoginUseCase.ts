import { TOBE } from "@/_lib/constants/Tobe";

export interface IGoogleLoginUseCase {
    execute(data: TOBE): Promise<TOBE>;
  }
  
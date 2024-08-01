import { TOBE } from "@/_lib/constants/Tobe";

export interface ILoginUseCase {
    execute(data: TOBE): Promise<TOBE>;
  }
  
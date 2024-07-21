import { TOBE } from "@/_lib/constants/Tobe";

export interface ILogoutUseCase {
  execute(data: TOBE): Promise<TOBE>;
}

import { TOBE } from "@/_lib/constants/Tobe";

export interface IRoomCreatedUseCase {
  execute(data: TOBE): Promise<TOBE>;
}

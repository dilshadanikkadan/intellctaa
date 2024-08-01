import { TOBE } from "@/_lib/constants/Tobe";

export interface IGetMyMessagesUseCase {
  execute(data: TOBE): Promise<TOBE>;
}

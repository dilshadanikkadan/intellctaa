import { TOBE } from "@/_lib/constants/Tobe";

export interface IGetAllInstructorUseCase {
  execute(data: TOBE): Promise<TOBE>;
}

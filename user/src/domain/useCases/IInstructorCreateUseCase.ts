import { TOBE } from "@/_lib/constants/Tobe";

export interface IInstructorCreateUseCase{
    execute(data: TOBE):Promise<TOBE>;
}
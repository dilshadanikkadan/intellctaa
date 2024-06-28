import { IUserCreatedUseCase } from "@/domain/useCases/ICreateUser";
import { IDependencies } from "./IDependencies";
import { IBlockUseCase } from "@/domain/useCases/IBlockUseCase";
import { IGetAllUseCase } from "@/domain/useCases/IGetAllUseCase";
import { IInstructorCreateUseCase } from "@/domain/useCases/IInstructorCreateUseCase";


export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => IUserCreatedUseCase;
  blockUseCase: (dependencies: IDependencies) => IBlockUseCase;
  getAllUserUseCase: (dependencies: IDependencies) => IGetAllUseCase;
  instructorCreateUseCase: (dependencies: IDependencies) => IInstructorCreateUseCase;
}

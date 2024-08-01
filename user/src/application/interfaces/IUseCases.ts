import { IUserCreatedUseCase } from "@/domain/useCases/ICreateUser";
import { IDependencies } from "./IDependencies";
import { IBlockUseCase } from "@/domain/useCases/IBlockUseCase";
import { IGetAllUseCase } from "@/domain/useCases/IGetAllUseCase";
import { IInstructorCreateUseCase } from "@/domain/useCases/IInstructorCreateUseCase";
import { IUpdateProfileUseCase } from "@/domain/useCases/IUpdateProfileUseCase";
import { IGetAllInstructorUseCase } from "@/domain/useCases/IGetAllInstructorUseCase";
import { IUserStaticsUseCase } from "@/domain/useCases/IUserStaticsUseCase";
import { IInstructorStaticsUseCase } from "@/domain/useCases/IInstructorStaticsUseCase";


export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => IUserCreatedUseCase;
  blockUseCase: (dependencies: IDependencies) => IBlockUseCase;
  getAllUserUseCase: (dependencies: IDependencies) => IGetAllUseCase;
  instructorCreateUseCase: (dependencies: IDependencies) => IInstructorCreateUseCase;
  updateProfileUseCase: (dependencies: IDependencies) => IUpdateProfileUseCase;
  getAllInstructorUseCase: (dependencies: IDependencies) => IGetAllInstructorUseCase;
  userStaticsUseCase: (dependencies: IDependencies) => IUserStaticsUseCase;
  instructorStaticsUseCase: (dependencies: IDependencies) => IInstructorStaticsUseCase;

}

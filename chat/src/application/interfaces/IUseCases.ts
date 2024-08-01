import { IUserCreatedUseCase } from "@/domain/useCases/ICreateUser";
import { IDependencies } from "./IDependencies";
import { IRoomCreatedUseCase } from "@/domain/useCases/IRoomCreatedUseCase";
import { IMessageCreatedUseCase } from "@/domain/useCases/IMessageCreatedUseCase";
import { IGetMessagesUseCase } from "@/domain/useCases/IGetMessagesUseCase";
import { IGetMyMessagesUseCase } from "@/domain/useCases/IGetMyMessagesUseCase";




export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => IUserCreatedUseCase;
  createRoomUseCase: (dependencies: IDependencies) => IRoomCreatedUseCase;
  createMessageUseCase: (dependencies: IDependencies) => IMessageCreatedUseCase;
  getMessagesUseCase: (dependencies: IDependencies) => IGetMessagesUseCase;
  getMyMessagesUseCase: (dependencies: IDependencies) => IGetMyMessagesUseCase;
 
}

import { IUserCreatedUseCase } from "@/domain/useCases/ICreateUser";
import { IDependencies } from "./IDependencies";
import { ISessionStripeUseCase } from "@/domain/useCases/ISessionStripe";
import { IWebHookUseCase } from "@/domain/useCases/IWebHookUseCase";



export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => IUserCreatedUseCase;
 stripeSessionUseCase: (dependencies: IDependencies) => ISessionStripeUseCase;
 webHookUseCase:(dependencies: IDependencies) => IWebHookUseCase;
}

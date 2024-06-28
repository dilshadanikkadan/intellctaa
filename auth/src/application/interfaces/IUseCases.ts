import { IUserCreatedUseCase } from "@/domain/useCases/ICreateUser";
import { IDependencies } from "./IDependencies";
import { IVerifyOtpUseCase } from "@/domain/useCases/IVerifyOtp";
import { IRefreshTokenUseCase } from "@/domain/useCases/IRefreshToken";
import { ILogoutUseCase } from "@/domain/useCases/ILogout";
import { IResentOtpUseCase } from "@/domain/useCases/IResentOtpUseCase";
import { IForgotPasswordUseCase } from "@/domain/useCases/IForgotPasswordUseCase";
import { IResetPasswordUseCase } from "@/domain/useCases/IResetPasswordUseCase";
import { ILoginUseCase } from "@/domain/useCases/ILoginUseCase";
import { IGoogleLoginUseCase } from "@/domain/useCases/IGoogleLoginUseCase";

export interface IUseCases {
  createUserUseCase: (dependencies: IDependencies) => IUserCreatedUseCase;
  verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
  refreshTokenUseCase:(dependencies: IDependencies) => IRefreshTokenUseCase;
  logoutUseCase:(dependencies: IDependencies) => ILogoutUseCase;
  resentOtpUseCase:(dependencies: IDependencies) => IResentOtpUseCase;
  forgotPasswordUseCase:(dependencies: IDependencies) => IForgotPasswordUseCase;
  resetPasswordUseCase:(dependencies: IDependencies) => IResetPasswordUseCase;
  loginUseCase:(dependencies: IDependencies) => ILoginUseCase;
  googleLoginUseCase:(dependencies: IDependencies) => IGoogleLoginUseCase;
}

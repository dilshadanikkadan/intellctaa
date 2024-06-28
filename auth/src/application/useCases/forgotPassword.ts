import { IDependencies } from "../interfaces/IDependencies";

export const forgotPasswordUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { forgotPassword },
  } = dependencies;
  return {
    execute: async (data: any) => {
        
      return await forgotPassword(data);
    },
  };
};

import { IDependencies } from "../interfaces/IDependencies";

export const resetPasswordUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { resetPassword },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await resetPassword(data);
    },
  };
};

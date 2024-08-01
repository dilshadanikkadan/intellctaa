import { IDependencies } from "../interfaces/IDependencies";

export const resentOtpUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { resentOtp },
  } = dependencies;
  return {
    execute: async (data: any) => {
      console.log("data from usecse verify", data);
      return await resentOtp(data);
    },
  };
};

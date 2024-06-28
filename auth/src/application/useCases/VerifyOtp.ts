import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { verifyOtp },
  } = dependencies;
  return {
    execute: async (data: any) => {
      console.log("data from usecse otp", data);
      return await verifyOtp(data);
    },
  };
};

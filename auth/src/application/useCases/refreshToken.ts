import { IDependencies } from "../interfaces/IDependencies";

export const refreshTokenUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { refreshToken },
  } = dependencies;
  return {
    execute: async (data: any) => {
      console.log("data from usecse verify", data);
      return await refreshToken(data);
    },
  };
};

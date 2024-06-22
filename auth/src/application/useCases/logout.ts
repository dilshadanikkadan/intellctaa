import { IDependencies } from "../interfaces/IDependencies";

export const logoutUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { logout },
  } = dependencies;
  return {
    execute: async (data: any) => {
      console.log("data from usecse verify", data);
      return await logout(data);
    },
  };
};

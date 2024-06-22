import { IDependencies } from "../interfaces/IDependencies";

export const loginUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { login },
  } = dependencies;
  return {
    execute: async (data: any) => {
      console.log("data from usecse verify", data);
      return await login(data);
    },
  };
};

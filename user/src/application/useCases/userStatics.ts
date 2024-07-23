import { IDependencies } from "../interfaces/IDependencies";

export const userStaticsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userStatics },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await userStatics(data);
    },
  };
};

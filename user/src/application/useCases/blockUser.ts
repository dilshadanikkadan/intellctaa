import { IDependencies } from "../interfaces/IDependencies";

export const blockUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockUser },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await blockUser(data);
    },
  };
};

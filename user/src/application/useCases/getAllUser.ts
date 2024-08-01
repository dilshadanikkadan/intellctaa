import { IDependencies } from "../interfaces/IDependencies";

export const getAllUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getAllUser },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await getAllUser(data);
    },
  };
};

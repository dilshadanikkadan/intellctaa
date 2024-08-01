import { IDependencies } from "../interfaces/IDependencies";

export const createUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createUser },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await createUser(data);
    },
  };
};
 
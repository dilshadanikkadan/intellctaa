import { TOBE } from "@/_lib/constants/Tobe";
import { IDependencies } from "../interfaces/IDependencies";

export const createUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createUser },
  } = dependencies;
  return {
    execute: async (data: TOBE) => {
      return await createUser(data);
    },
  };
};

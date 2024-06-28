import { IDependencies } from "../interfaces/IDependencies";

export const instructorCreateUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { instructorCreate },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await instructorCreate(data);
    },
  };
};

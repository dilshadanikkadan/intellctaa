import { IDependencies } from "../interfaces/IDependencies";

export const instructorStaticsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { instructorStatics },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await instructorStatics(data);
    },
  };
};

import { IDependencies } from "../interfaces/IDependencies";

export const getAllInstructorUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getAllInstructor },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await getAllInstructor(data);
    },
  };
};

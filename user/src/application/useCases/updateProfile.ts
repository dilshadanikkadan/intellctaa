import { IDependencies } from "../interfaces/IDependencies";

export const updateProfileUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateProfile },
  } = dependencies;
  return {
    execute: async (data: any) => {
      return await updateProfile(data);
    },
  }; 
};

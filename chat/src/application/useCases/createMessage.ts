import { IDependencies } from "../interfaces/IDependencies";

export const createMessageUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createMessage },
  } = dependencies;
  return {
    execute: async (data: any) => {
    
        
      return await createMessage(data);
    },
  };
};

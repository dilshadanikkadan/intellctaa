import { IDependencies } from "../interfaces/IDependencies";

export const getMyMessagesUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getMyMessages },
  } = dependencies;
  return {
    execute: async (data: any) => {
    
        
      return await getMyMessages(data);
    },
  };
};

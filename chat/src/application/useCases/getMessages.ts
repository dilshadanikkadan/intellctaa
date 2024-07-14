import { IDependencies } from "../interfaces/IDependencies";

export const getMessagesUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getMessages },
  } = dependencies;
  return {
    execute: async (data: any) => {
    
        
      return await getMessages(data);
    },
  };
};
